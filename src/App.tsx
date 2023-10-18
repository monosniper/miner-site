import { useEffect, useState } from "react";
import { PageLayout } from "./components/layout";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "./hooks/useRouter";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setAuth,
  setUserData,
  setWallet,
  user,
} from "./redux/slices/userSlice";
import { checkToken, getCoinData } from "./utils";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, useRefreshMutation } from "./redux/api/authApi";
import { ToastContainer } from "react-toastify";
import { useGetSettingsQuery } from "./redux/api/walletApi";
import { setCoins } from "./redux/slices/coinsSlice";
import socket from "./socket";
import { miner, setWork } from "./redux/slices/minerSlice";
import { Disconnect } from "./components";
import { main, setDisconnected } from "./redux/slices/mainSlice";

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
  const { isAuth } = useAppSelector(user);
  const { atWork } = useAppSelector(miner);
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

    return () => {
      socket.off("connect");
      socket.off("reconnect_attempt");
      socket.off("disconnect");
      socket.off("reconnect");
    };
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
        }),
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
      }),
    );
  }, [refreshData, dispatch]);

  useEffect(() => {
    const check = async () => {
      const isDeadToken = await checkToken();
      const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
        localStorage.getItem("tokens") || "{}",
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
      JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
    );

    dispatch(setAuth(true));
  }, [accessToken, dispatch, refreshToken]);

  useEffect(() => {
    if (!getMeData) return;

    localStorage.setItem("token", getMeData.token);

    dispatch(setUserData(getMeData));
  }, [dispatch, getMeData]);

  return (
    <div>
      <PageLayout>{useRouter(isAuth)}</PageLayout>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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
