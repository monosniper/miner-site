import { Header, Menu } from "@/components";
import { FC, ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "clsx";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import { useGetSettingsQuery } from "@/redux/api/walletApi";

type Props = {
  children: ReactNode;
};

export const PageLayout: FC<Props> = ({ children }) => {
  const location = useLocation();
  const { userData } = useAppSelector(user);
  const [demoTime, setDemoTime] = useState<number>();
  const { data: settingsData } = useGetSettingsQuery(null);

  const showModeTime = () => {
    if (!userData) return;

    const { demo_time: demoTimeUser, status } = userData;

    if (status === "demo" && demoTime) {
      const secondsUser = demoTime - demoTimeUser;

      if (demoTimeUser >= demoTime) {
        return toast.error("There's no time left");
      }

      const hours = Math.floor(secondsUser / 3600);
      const remainingSeconds = secondsUser % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

      toast.warning(
        `Time left - ${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
      );
    }
  };

  useEffect(() => {
    if (!settingsData) return;

    const demoTimeVal = settingsData.find((el) => el.key === "demo_time");

    if (demoTimeVal) setDemoTime(Number(demoTimeVal.value));
  }, [settingsData]);

  return (
    <div className="relative flex flex-col min-h-screen bg-none">
      {userData?.status !== "standart" && (
        <div
          className={cn(
            "max-w-[652px] w-full mx-auto py-3 text-center cursor-pointer",
            {
              "bg-red-500": userData?.status === "demo",
              "bg-green-500": userData?.status === "pro",
            },
          )}
          onClick={showModeTime}
        >
          {userData?.status.toUpperCase() || ""}
        </div>
      )}

      <Menu className="sm:mt-8" />

      <div className="min-h-screen sm:min-h-max flex flex-col flex-grow">
        <Header className="sm:hidden" />

        <div className="pb-8 sm:pb-0 flex flex-col flex-grow sm:mb-0">
          {children}
        </div>

        {location.pathname !== "/pro" && (
          <div className="w-full border-t border-[rgba(255,255,255,0.20)] hidden sm:block overflow-hidden relative">
            <div className="container relative py-5">
              <svg
                className="absolute bottom-0 left-4"
                width="73"
                height="72"
                viewBox="0 0 73 72"
                fill="none"
              >
                <path
                  d="M44.0123 1.50883L2.49999 38.4397C0.937959 39.7987 0.391125 41.8524 1.07036 43.8091C1.74959 45.7657 3.54877 47.3194 5.77408 47.8712L21.2542 52.019C23.2479 52.5399 24.9803 53.7297 26.0669 55.3246C27.1535 56.9194 27.5044 58.7873 27.0417 60.5138L22.5005 77.4619C21.9671 79.5257 23.0455 81.7528 25.16 82.9546C27.2746 84.1564 29.9319 84.0524 31.7137 82.6981L70.2554 53.1731C71.9446 51.8723 72.6248 49.8053 72.0278 47.7872C71.4309 45.7691 69.6526 44.1238 67.3942 43.5001L52.6718 39.5552C48.5466 38.4499 45.9796 34.6531 46.9384 31.075L53.5049 6.56829C54.095 4.43494 52.9479 2.1147 50.7146 0.924372C48.4813 -0.265954 45.726 -0.0256794 44.0123 1.50883Z"
                  fill="#C6D612"
                />
              </svg>

              <svg
                className="absolute bottom-5 right-4"
                width="59"
                height="71"
                viewBox="0 0 59 71"
                fill="none"
              >
                <path
                  d="M21.0409 2.6526L1.40012 44.2724C0.6511 45.8151 0.901264 47.5576 2.05414 48.828C3.20701 50.0984 5.08247 50.6981 6.95727 50.396L20.0998 48.5304C21.7881 48.2799 23.4945 48.624 24.8403 49.4865C26.1861 50.3489 27.06 51.6583 27.268 53.1241L29.3106 67.5129C29.5743 69.2587 31.1191 70.6056 33.1206 70.8348C35.1221 71.0639 37.1131 70.1219 38.0311 68.5114L57.813 33.4994C58.6777 31.9597 58.5249 30.1638 57.4148 28.8199C56.3046 27.4759 54.4154 26.7996 52.492 27.0576L39.9928 28.8319C36.4905 29.3291 33.3017 27.2695 32.8705 24.2317L29.917 3.42567C29.674 1.60848 28.0465 0.212928 25.9583 0.0310497C23.87 -0.150828 21.8485 0.926905 21.0409 2.6526Z"
                  fill="#C6D612"
                />
              </svg>

              <Link
                to="/pro"
                className="w-max flex items-center gap-2 bg-gradient-300 rounded-full border border-[rgba(255,255,255,0.20)] border-solid mx-auto py-2 px-10 text-base font-medium text-white"
              >
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path
                    d="M10.1704 2.92257L5.62871 10.8809C5.45663 11.1753 5.45713 11.5397 5.63001 11.8336C5.80289 12.1275 6.12115 12.3049 6.46204 12.2976H8.84538C9.15182 12.2954 9.44647 12.4155 9.66394 12.6314C9.88141 12.8473 10.0037 13.1411 10.0037 13.4476V16.4559C10.0065 16.8214 10.2472 17.1423 10.5972 17.2475C10.9472 17.3527 11.3249 17.2176 11.5287 16.9142L15.9287 10.3142C16.1213 10.0239 16.1394 9.65135 15.976 9.34362C15.8126 9.03589 15.4938 8.84232 15.1454 8.83924H12.8787C12.2436 8.83924 11.7287 8.32436 11.7287 7.68924V3.33924C11.7314 2.95974 11.4773 2.62639 11.1107 2.52836C10.744 2.43033 10.3575 2.59239 10.1704 2.92257Z"
                    fill="#C6D612"
                  />
                </svg>

                <span>Buy Pro Network</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
