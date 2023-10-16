import { useEffect } from "react";
import { PageLayout } from "./components/layout";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "./hooks/useRouter";
import jwtDecode from "jwt-decode";
import { User } from "./types";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setAuth, setUserData, user } from "./redux/slices/userSlice";
import { checkToken } from "./utils";
import { useNavigate } from "react-router-dom";
import { useRefreshMutation } from "./redux/api/authApi";
import { ToastContainer } from "react-toastify";

interface tokenData extends User {
  exp: number;
  iat: number;
}

const App = () => {
  const params = new URLSearchParams(window.location.search);

  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(user);
  const navigate = useNavigate();
  const [refresh, { isError: refreshIsError, data: refreshData }] =
    useRefreshMutation();

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
    const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
      localStorage.getItem("tokens") || "{}",
    );

    if (!tokens.accessToken && !tokens.refreshToken) return;

    const decode: tokenData = jwtDecode(tokens.accessToken);

    const resData = {
      id: decode.id,
      name: decode.name,
      options: decode.options,
      token: decode.token,
      username: decode.username,
      balance: decode.balance,
      isPro: decode.isPro,
      ref_code: decode.ref_code,
    };

    localStorage.setItem("token", decode.token);

    dispatch(setUserData(resData));
  }, [dispatch]);

  return (
    <div>
      <PageLayout>{useRouter(isAuth)}</PageLayout>

      <ToastContainer
        position="top-right"
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
