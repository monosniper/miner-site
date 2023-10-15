import { useEffect } from "react";
import { PageLayout } from "./components/layout";

import { useRouter } from "./hooks/useRouter";
import { socket } from "./socket";
import jwtDecode from "jwt-decode";
import { User } from "./types";
import { useAppDispatch } from "./redux/store";
import { setUserData } from "./redux/slices/userSlice";

interface tokenData extends User {
  exp: number;
  iat: number;
}

const App = () => {
  const params = new URLSearchParams(window.location.search);

  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("connect", () => console.log("connected!"));

    return () => {
      socket.off("connect");
    };
  }, []);

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
    };

    dispatch(setUserData(resData));
  }, [dispatch]);

  return (
    <div>
      <PageLayout>{useRouter()}</PageLayout>
    </div>
  );
};

export default App;
