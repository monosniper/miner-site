import { useEffect, useState } from "react";
import { PageLayout } from "./components/layout";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "./hooks/useRouter";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setAuth,
  setTotalBalance,
  setUserData,
  setWallet,
  user,
} from "./redux/slices/userSlice";
import { checkToken } from "./utils";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, useRefreshMutation } from "./redux/api/authApi";
import { ToastContainer } from "react-toastify";
import { useGetSettingsQuery } from "./redux/api/walletApi";
import { setCoins } from "./redux/slices/coinsSlice";
import { coins as coinsSlice } from "./redux/slices/coinsSlice";

const getCoinData = async (name: string) => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${name}/usd.json`,
  );

  const result = await res.json();

  return result;
};

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
  const { isAuth, userData } = useAppSelector(user);
  const { coins } = useAppSelector(coinsSlice);
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

  useEffect(() => {
    if (!userData || !coins) return;

    const { balance } = userData;

    const sums = Object.entries(balance).map((el) => {
      const currentCoinCourse = coins.find(
        (item) => el[0].toLowerCase() === item.name.toLowerCase(),
      );

      if (!currentCoinCourse) return el;

      const usdt = currentCoinCourse.usd * el[1];

      return [el[0], usdt];
    });

    if (sums) {
      const totalBalance = sums.reduce(
        (prev, curr) => prev + Number(curr[1]),
        0,
      );

      dispatch(setTotalBalance(totalBalance));
    }
  }, [coins, dispatch, userData]);

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
      id: refreshData.id,
      name: refreshData.name,
      options: refreshData.options,
      token: refreshData.token,
      username: refreshData.username,
      balance: refreshData.balance,
      isPro: refreshData.isPro,
      ref_code: refreshData.ref_code,
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

      if (!tokens.accessToken) {
        window.location.href = import.meta.env.VITE_LANDING_URL;
      }

      if (isDeadToken) {
        refresh({ refreshToken: tokens.refreshToken });
      }
    };

    check();
  }, [accessToken, dispatch, navigate, refresh]);

  useEffect(() => {
    if (!accessToken && !refreshToken) return;

    localStorage.setItem(
      "tokens",
      JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
    );
  }, [accessToken, refreshToken]);

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
    </div>
  );
};

export default App;
