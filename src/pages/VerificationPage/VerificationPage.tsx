import { Button, FieldWrapper, TextField } from "@/components/ui";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { useGetSettingsQuery } from "@/redux/api/walletApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const VerificationPage = () => {
  const { wallet } = useAppSelector(user);
  const { data: settingsData } = useGetSettingsQuery(null);
  const [supportVal, setSupportVal] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    if (!settingsData) return;

    const support = settingsData.find((el) => el.key === "support");

    if (!support) return;

    setSupportVal(support.value);
  }, [settingsData, supportVal]);

  return (
    <div className="flex flex-col flex-grow mt-8 mb-[110px]">
      <div className="container flex flex-col flex-grow">
        <div className="hidden sm:flex flex-col">
          <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
            Verification
          </h3>
        </div>

        <div className="w-full border border-warning bg-warning/10 rounded-lg p-4 font-inter sm:mt-8">
          <div className="flex items-start gap-2 text-xl">
            <img src="/images/cursor-top.png" alt="cursor" />
            <div>
              <p>Verificate your ID to withdraw money.</p>
              <Link
                className="mt-4 inline-block text-sm text-gray-2 border-b border-gray-2"
                target="_blank"
                to={
                  location.pathname.includes("miner777.space")
                    ? `https://t.me/helpmineres`
                    : `https://t.me/${supportVal}`
                }
              >
                Know more
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 bg-base-200/60 sm:bg-transparent sm:text-center sm:text-sm flex sm:hidden flex-col gap-4 text-xl font-inter mt-10 rounded-lg">
          <p>Minimum withdraw amount — $100</p>
          <p className="text-sm border-b border-white w-max sm:hidden">
            Network TRC-20 (USDT)
          </p>
        </div>

        <form className="flex flex-col mt-6 flex-grow">
          <div className="flex items-center w-full gap-6">
            <FieldWrapper className="w-full" title="Wallet">
              <TextField
                placeholder="Your wallet"
                disabled={true}
                value={wallet || ""}
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
              title={"Payed"}
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
