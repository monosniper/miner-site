import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useGetSettingsQuery } from "@/redux/api/walletApi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

export const ProPage = () => {
  const { data: settingsData } = useGetSettingsQuery(null);
  const [supportVal, setSupportVal] = useState<string>();
  const { wallet } = useAppSelector(user);
  const [proPrice, setProPrice] = useState(0);
  const [standartPrice, setStandartPrice] = useState(0);

  useEffect(() => {
    if (!settingsData) return;

    const proPriceVal = settingsData.find((el) => el.key === "pro_price");
    const standartPriceVal = settingsData.find(
      (el) => el.key === "default_price",
    );
    const support = settingsData.find((el) => el.key === "support");

    if (support) setSupportVal(support.value);
    if (proPriceVal) setProPrice(Number(proPriceVal.value));
    if (standartPriceVal) setStandartPrice(Number(standartPriceVal.value));
  }, [settingsData, supportVal]);

  return (
    <div className="bg-gradient-100 sm:bg-none flex flex-col flex-grow relative">
      <svg
        className="absolute bottom-5 sm:hidden"
        width="125"
        height="229"
        viewBox="0 0 125 229"
        fill="none"
      >
        <path
          d="M-16.5949 11.9672L-55.0984 160.729C-56.5945 166.256 -54.6885 171.816 -50.1153 175.266C-45.5422 178.715 -39.0164 179.514 -33.0546 177.355L8.89529 163.049C14.2775 161.175 20.0895 161.241 25.0415 163.232C29.9934 165.223 33.6757 168.974 35.2711 173.652L50.9344 219.581C52.8868 225.143 58.7933 228.599 65.5017 228.104C72.21 227.609 78.1545 223.279 80.1628 217.424L123.245 90.2498C125.123 84.6605 123.503 78.8646 119.024 75.1475C114.545 71.4304 107.926 70.3887 101.778 72.4331L61.8812 86.0393C50.7021 89.8518 38.9589 85.0819 35.652 75.3855L13.0033 8.97415C11.0741 3.1645 4.86614 -0.399633 -2.09734 0.304524C-9.06081 1.00868 -15.0209 5.80326 -16.5949 11.9672Z"
          fill="#C6D612"
        />
      </svg>

      <svg
        className="absolute right-0 bottom-40 sm:hidden"
        width="162"
        height="210"
        viewBox="0 0 162 210"
        fill="none"
      >
        <path
          d="M99.2156 4.20617L4.00767 103.145C0.419299 106.792 -0.534794 111.957 1.51332 116.647C3.56143 121.338 8.29174 124.822 13.8801 125.755L52.8143 133.011C57.8262 133.912 62.3223 136.512 65.3048 140.234C68.2873 143.955 69.5095 148.49 68.7001 152.832L60.7562 195.459C59.8372 200.646 62.9204 205.926 68.3604 208.483C73.8003 211.039 80.3274 210.274 84.4583 206.596L173.765 126.473C177.678 122.945 178.958 117.722 177.101 112.864C175.244 108.006 170.547 104.292 164.864 103.188L127.835 96.2874C117.46 94.3538 110.408 85.4909 112.086 76.4915L123.572 14.8543C124.618 9.48518 121.347 3.98814 115.617 1.48298C109.887 -1.02218 103.144 0.09734 99.2156 4.20617Z"
          fill="#C6D612"
        />
      </svg>

      <div className="container flex flex-col flex-grow relative">
        <div className="hidden sm:block bg-gradient-400 p-4 rounded-lg relative mt-5">
          <h3 className="text-[28px] font-semibold leading-[32px] max-w-[282px] w-full">
            Buy PRO Network for max wage.
          </h3>

          <Link
            className="mt-10 inline-block"
            target="_blank"
            to={
              document.location.hostname.includes("miner777.space")
                ? `https://t.me/helpmineres`
                : `https://t.me/${supportVal}`
            }
          >
            Know more
          </Link>

          <svg
            className="absolute top-1/2 -translate-y-1/2 right-10"
            width="91"
            height="107"
            viewBox="0 0 91 107"
            fill="none"
          >
            <path
              d="M50.9224 2.2472L2.6393 52.4222C0.819522 54.2718 0.335671 56.891 1.37433 59.2698C2.413 61.6486 4.8119 63.4153 7.64593 63.8886L27.3907 67.5683C29.9324 68.0255 32.2125 69.344 33.7251 71.2312C35.2376 73.1184 35.8574 75.4183 35.4469 77.6204L31.4183 99.2376C30.9523 101.868 32.5159 104.546 35.2747 105.842C38.0334 107.139 41.3435 106.751 43.4384 104.886L88.7288 64.2526C90.713 62.4633 91.3622 59.8146 90.4204 57.351C89.4786 54.8874 87.0969 53.0042 84.2145 52.4442L65.4363 48.9446C60.1745 47.964 56.5986 43.4693 57.4491 38.9054L63.2744 7.64723C63.8046 4.92436 62.146 2.13664 59.24 0.86619C56.334 -0.404258 52.9145 0.163484 50.9224 2.2472Z"
              fill="#C6D612"
            />
          </svg>
        </div>

        <div className="p-4 bg-base-200/60 sm:bg-transparent  sm:text-center sm:text-sm sm:items-center flex flex-col gap-4 text-xl font-inter mt-4 rounded-lg">
          <p className="text-sm border-b border-white w-max">
            Network TRC-20 (USDT)
          </p>

          <p className="text-xl max-w-full w-full">
            Pro - {proPrice}$, Standart - {standartPrice}$, Premium Pro Lux -
            399$
          </p>
        </div>

        <form className="flex flex-col flex-grow relative z-20 mt-6 sm:mt-0 mb-[106px] pb-5">
          <div className="flex items-center w-full gap-6">
            <FieldWrapper className="w-full" title="Wallet">
              <TextField
                placeholder="Your wallet"
                value={wallet || ""}
                disabled={true}
              />
            </FieldWrapper>

            <div
              className="translate-y-3 cursor-pointer"
              onClick={() => {
                if (wallet) {
                  navigator.clipboard.writeText(wallet);

                  toast.success("Successfully copied!");
                }
              }}
            >
              <svg
                className="w-10 h-10"
                viewBox="0 -0.5 25 25"
                fill="none"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.676 14.248C17.676 15.8651 16.3651 17.176 14.748 17.176H7.428C5.81091 17.176 4.5 15.8651 4.5 14.248V6.928C4.5 5.31091 5.81091 4 7.428 4H14.748C16.3651 4 17.676 5.31091 17.676 6.928V14.248Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M10.252 20H17.572C19.1891 20 20.5 18.689 20.5 17.072V9.75195"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>

          <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
            <Button
              className="!w-max bg-white"
              title="Payed"
              type="button"
              onClick={() => {
                if (supportVal) {
                  window.open(`https://t.me/${supportVal}`);
                }
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
