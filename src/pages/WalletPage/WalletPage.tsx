import { Button, FieldWrapper, TextField } from "@/components/ui";
import { useWithdrawMutation } from "@/redux/api/walletApi";
import { useForm } from "react-hook-form";

type FormData = {
  amount: string;
  wallet: string;
};

export const WalletPage = () => {
  const [withdraw, { isLoading, isSuccess, isError }] = useWithdrawMutation();
  const methods = useForm<FormData>();

  const formHandler = ({ amount, wallet }: FormData) => {
    if (!amount || !wallet) return;

    withdraw({ amount: Number(amount), wallet: Number(wallet) });
  };

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
                <TextField
                  placeholder="Your wallet"
                  type="number"
                  methods={methods}
                  registerName="wallet"
                  options={{
                    required: {
                      value: true,
                      message: "Обязательно для заполнения",
                    },
                  }}
                />
              </FieldWrapper>
            </div>

            <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
              <Button
                className="!w-max bg-white"
                type="submit"
                title={isSuccess || isError ? "Success!" : "Withdraw"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
