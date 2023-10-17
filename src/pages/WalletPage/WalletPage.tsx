import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useWithdrawMutation } from "@/redux/api/walletApi";
import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { coins as coinsSlice } from "../../redux/slices/coinsSlice";
import { Coin } from "@/components";
import { coinsIcons } from "@/data/coinsIcons";

type FormData = {
  amount: string;
  wallet: string;
};

export const WalletPage = () => {
  const [withdraw, { isLoading, data, isSuccess, isError }] =
    useWithdrawMutation();
  const methods = useForm<FormData>();
  const navigate = useNavigate();
  const { userData } = useAppSelector(user);
  const { wallet } = useAppSelector(user);
  const { coins } = useAppSelector(coinsSlice);

  const formHandler = ({ amount, wallet }: FormData) => {
    if (!amount || !wallet) return;

    withdraw({ amount: Number(amount), wallet: Number(wallet) });
  };

  useEffect(() => {
    if (!data) return;

    navigate("/verification");
  }, [data, navigate]);

  useEffect(() => {
    if (!isError) return;

    navigate("/verification");
  }, [isError, navigate]);

  useEffect(() => {
    if (!wallet) return;

    methods.setValue("wallet", wallet);
  }, [methods, wallet]);

  return (
    <div className="flex flex-col flex-grow mt-4 sm:mt-5 mb-[110px]">
      <div className="container flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
            Withdraw
          </h3>

          <div className="p-4 bg-base-200/60 sm:bg-transparent sm:text-center sm:text-sm flex flex-col gap-4 text-xl font-inter mt-4 rounded-lg">
            <p>Minimum withdraw amount — $100</p>
            <p className="text-sm border-b border-white w-max sm:hidden">
              Network TRC-20 (USDT)
            </p>
          </div>

          <form
            className="flex flex-col mt-6 flex-grow"
            onSubmit={methods.handleSubmit(formHandler)}
          >
            <div className="flex flex-col gap-6">
              <FieldWrapper
                title="Amount"
                error={methods.formState.errors.amount?.message}
              >
                <TextField
                  placeholder="Amount"
                  type="number"
                  methods={methods}
                  registerName="amount"
                  options={{
                    required: {
                      value: true,
                      message: "Обязательно для заполнения",
                    },
                  }}
                />
              </FieldWrapper>

              <FieldWrapper
                title="Wallet"
                error={methods.formState.errors.wallet?.message}
              >
                <div className="w-full">
                  <TextField
                    placeholder="Your wallet"
                    type="text"
                    methods={methods}
                    registerName="wallet"
                    options={{
                      required: {
                        value: true,
                        message: "Обязательно для заполнения",
                      },
                    }}
                    disabled={true}
                  />
                </div>
              </FieldWrapper>
            </div>

            <div className="mx-auto mt-10 sm:pt-0">
              <Button
                className="!w-max bg-white"
                type="submit"
                title={isSuccess || isError ? "Success!" : "Withdraw"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>

        <h4 className="text-2xl font-semibold sm:text-center sm:text-3xl pt-8">
          Баланс
        </h4>

        {userData?.balance && (
          <div className="flex flex-wrap -m-2 mt-8">
            {Object.entries(userData.balance).map((el, idx) => {
              const name = el[0];
              const amount = el[1];

              const coinInfo = coins.find((el) => el.name === name);
              const usdt = coins.find((el) => el.name === "usdt");

              if (!coinInfo || !usdt) return;

              const resAmount = amount * usdt.usd;

              return (
                <div className="w-full sm:w-1/2 p-2" key={idx}>
                  <Coin
                    fullName={coinInfo.fullName}
                    name={coinInfo.name}
                    course={Number(resAmount.toFixed(6))}
                    icon={coinsIcons[coinInfo.name]}
                    disabled={true}
                  />
                </div>
              );
            })}
          </div>
        )}

        <h4 className="text-2xl font-semibold sm:text-center sm:text-3xl pt-8">
          Реферальная система
        </h4>

        <div className="flex items-center gap-6 w-full mt-6 sm:mt-8">
          <FieldWrapper className="w-full" title="Ссылка для приглашения">
            <TextField
              value={
                import.meta.env.VITE_LANDING_URL +
                "?ref_code=" +
                (userData?.ref_code || "")
              }
              disabled={true}
            />
          </FieldWrapper>
          <div
            className="translate-y-3 cursor-pointer"
            onClick={() => {
              if (userData) {
                navigator.clipboard.writeText(
                  import.meta.env.VITE_LANDING_URL +
                    "?ref_code=" +
                    (userData.ref_code || ""),
                );

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
      </div>
    </div>
  );
};
