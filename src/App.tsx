import { useEffect, useState } from "react";
import { PageLayout } from "./components/layout";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "./hooks/useRouter";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setAuth,
  setBlockedMiner,
  setSumCoins,
  setUserData,
  setWallet,
  user,
} from "./redux/slices/userSlice";
import { checkToken, getCoinData } from "./utils";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, useRefreshMutation } from "./redux/api/authApi";
import { ToastContainer } from "react-toastify";
import {
  useGetSettingsQuery,
  useSetBalanceMutation,
} from "./redux/api/walletApi";
import { setCoins } from "./redux/slices/coinsSlice";
import socket from "./socket";
import {
  miner,
  setPrevUpdateData,
  setUpdateData,
  setWork,
} from "./redux/slices/minerSlice";
import { Disconnect } from "./components";
import { main, setDisconnected } from "./redux/slices/mainSlice";
import { toast } from "react-toastify";
import { coins as coinsSlice } from "./redux/slices/coinsSlice";

const coinsFullNames: { [key: string]: string } = {
  btc: "Bitcoin",
  usdt: "Tether",
  eth: "Ethereum",
  doge: "Dogecoin",
  ton: "Toncoin",
};

const App = () => {
  const params = new URLSearchParams(window.location.search);

  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");
  const dispatch = useAppDispatch();
  const { isAuth, userData, isBlockedMiner, sumCoins } = useAppSelector(user);
  const { atWork, updateData, prevUpdateData } = useAppSelector(miner);
  const navigate = useNavigate();
  const [refresh, { isError: refreshIsError, data: refreshData }] =
    useRefreshMutation();
  const { data: getMeData } = useGetMeQuery(null, {
    skip: !isAuth,
  });
  const { data: settingsData } = useGetSettingsQuery(null, {
    skip: !isAuth,
  });
  const [coinsNames] = useState(["btc", "usdt", "eth", "doge", "ton"]);
  const { isDisconnected } = useAppSelector(main);
  const [setBalance, { data: balanceData }] = useSetBalanceMutation();
  const [prevFounds, setPrevFounds] = useState<
    {
      name: string;
      amount: number;
    }[]
  >([]);
  const { coins } = useAppSelector(coinsSlice);

  const [demoTime, setDemoTime] = useState<number>();

  useEffect(() => {
    if (!settingsData) return;

    const demoTimeVal = settingsData.find((el) => el.key === "demo_time");

    if (demoTimeVal) setDemoTime(Number(demoTimeVal.value));
  }, [settingsData]);

  useEffect(() => {
    if (!updateData) return;

    const usdtCourse = coins.find((el) => el.name === "usdt")?.usd;

    if (!usdtCourse) return;

    const { founds } = updateData;

    if (founds.length === 0) return;

    if (prevFounds.length === founds.length) return;

    setPrevFounds(founds);

    const sumCoins: { [name: string]: number } = {};

    const lastFound = founds[founds.length - 1];

    if (atWork) {
      sumCoins[lastFound.name.toLowerCase()] = lastFound.amount / usdtCourse;
    }

    dispatch(setSumCoins(sumCoins));
  }, [updateData, dispatch, coins, prevFounds.length, atWork]);

  useEffect(() => {
    if (!balanceData) return;

    dispatch(setUserData(balanceData));
  }, [balanceData, dispatch]);

  useEffect(() => {
    if (!userData || !sumCoins || !atWork) return;

    const balance = { ...userData.balance };

    for (const coin in sumCoins) {
      if (balance[coin]) {
        balance[coin] += sumCoins[coin];
      } else {
        balance[coin] = sumCoins[coin];
      }
    }

    let sumUsdt = 0;

    for (const coin in balance) {
      if (coin !== "usdt") {
        sumUsdt += balance[coin];
      }
    }

    balance["usdt"] = sumUsdt;

    setBalance(balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sumCoins]);

  useEffect(() => {
    socket.on("update", (data) => {
      if (prevUpdateData) {
        dispatch(
          setUpdateData({
            checks: [...prevUpdateData.checks, ...data.checks],
            founds: [...prevUpdateData.founds, ...data.founds],
            logs: [...prevUpdateData.logs, ...data.logs],
          })
        );
      } else {
        dispatch(setUpdateData(data));
      }
    });

    return () => {
      socket.off("update");
    };
  }, [dispatch, prevUpdateData, updateData]);

  useEffect(() => {
    dispatch(setPrevUpdateData(updateData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atWork, dispatch]);

  useEffect(() => {
    if (!userData || !demoTime) return;

    if (userData.demo_time >= demoTime && userData.status === "demo") {
      dispatch(setBlockedMiner(true));
    }
  }, [demoTime, dispatch, userData]);

  useEffect(() => {
    if (isBlockedMiner) {
      toast.warning(
        "The lifetime of the demo mode has expired. To buy a miner, click Buy Pro"
      );
    }
  }, [isBlockedMiner]);

  const stopMiner = () => {
    socket.emit("stop", null);
    dispatch(setWork(false));
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      if (!atWork) {
        socket.connect();
      }
    } else {
      if (atWork) {
        stopMiner();

        socket.disconnect();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atWork]);

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setDisconnected(false));
    });

    socket.on("reconnect_attempt", () => {
      dispatch(setDisconnected(true));
    });

    socket.on("reconnect", () => {
      dispatch(setDisconnected(false));
    });

    socket.on("disconnect", () => {
      dispatch(setDisconnected(true));
    });

    socket.on("demo_expired", () => {
      stopMiner();

      dispatch(setBlockedMiner(true));
    });

    return () => {
      socket.off("connect");
      socket.off("reconnect_attempt");
      socket.off("disconnect");
      socket.off("reconnect");
      socket.off("demo_expired");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const coinDataArray = await Promise.all(
        coinsNames.map(async (coin) => {
          const data = await getCoinData(coin);
          return {
            name: coin,
            fullName: coinsFullNames[coin],
            ...data,
          };
        })
      );

      dispatch(setCoins(coinDataArray));
    };

    fetchData();
  }, [coinsNames, dispatch]);

  useEffect(() => {
    if (!settingsData) return;

    const wallet = settingsData.find((el) => el.key === "wallet");

    if (!wallet) return;

    dispatch(setWallet(wallet.value));
  }, [dispatch, settingsData]);

  useEffect(() => {
    if (!refreshIsError) return;

    dispatch(setAuth(false));

    window.location.href = import.meta.env.VITE_LANDING_URL;
  }, [dispatch, refreshIsError, navigate]);

  useEffect(() => {
    if (!refreshData) return;

    const resData = {
      id: refreshData.user.id,
      name: refreshData.user.name,
      options: refreshData.user.options,
      token: refreshData.user.token,
      username: refreshData.user.username,
      balance: refreshData.user.balance,
      ref_code: refreshData.user.ref_code,
      status: refreshData.user.status,
      demo_time: refreshData.user.demo_time,
    };

    localStorage.setItem("token", resData.token);

    dispatch(setUserData(resData));

    localStorage.setItem(
      "tokens",
      JSON.stringify({
        accessToken: refreshData.accessToken,
        refreshToken: refreshData.refreshToken,
      })
    );
  }, [refreshData, dispatch]);

  useEffect(() => {
    const check = async () => {
      const isDeadToken = await checkToken();
      const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
        localStorage.getItem("tokens") || "{}"
      );

      if (!tokens.refreshToken) {
        return (window.location.href = import.meta.env.VITE_LANDING_URL);
      }

      if (isDeadToken) {
        refresh({ refreshToken: tokens.refreshToken });
      }
    };

    check();
  }, [accessToken, dispatch, navigate, refresh, refreshToken]);

  useEffect(() => {
    if (!accessToken && !refreshToken) return;
    localStorage.removeItem("tokens");
    localStorage.removeItem("tokens");

    localStorage.setItem(
      "tokens",
      JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken })
    );

    navigate("/");

    dispatch(setAuth(true));
  }, [accessToken, dispatch, navigate, refreshToken]);

  useEffect(() => {
    if (!getMeData) return;

    localStorage.setItem("token", getMeData.token);

    dispatch(setUserData(getMeData));

    // eslint-disable-next-line
    // @ts-ignore
    socket.auth.token = getMeData.token;

    socket.connect();
  }, [dispatch, getMeData]);

  return (
    <div>
      <PageLayout>{useRouter(isAuth)}</PageLayout>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />

      {isDisconnected && <Disconnect />}
    </div>
  );
};

export default App;
