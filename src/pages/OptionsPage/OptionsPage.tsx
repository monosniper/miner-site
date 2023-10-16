import { Button, FieldWrapper, TextField } from "@/components/ui";
import { usePutOptionsMutation } from "@/redux/api/optionsApi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormData = {
  network: string;
  wallet: string;
  transactionId: string;
};

export const OptionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [putOptions, { isSuccess, isError }] = usePutOptionsMutation();
  const methods = useForm<FormData>();

  const formHandler = ({ network, wallet, transactionId }: FormData) => {
    if (currentPage === 1) {
      return setCurrentPage(2);
    }

    putOptions({ network, wallet, transactionId });
  };

  useEffect(() => {
    if (!isError) return;

    alert("Mistake. Repeat again");
  }, [isError]);

  return (
    <div className="flex flex-col flex-grow mt-8 mb-[110px]">
      <div className="container flex flex-col flex-grow">
        <div className="hidden sm:flex flex-col">
          <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
            Options
          </h3>
        </div>

        {currentPage === 1 && (
          <form
            className="flex flex-col flex-grow sm:mt-6"
            onSubmit={methods.handleSubmit(formHandler)}
          >
            <div className="flex flex-col gap-6">
              <FieldWrapper
                title="Network"
                error={methods.formState.errors.network?.message}
              >
                <TextField
                  placeholder="Your network"
                  methods={methods}
                  registerName="network"
                  options={{
                    required: {
                      value: true,
                      message: "Поле обязательно для заполнения",
                    },
                  }}
                />
              </FieldWrapper>

              {/* <Radio
                list={[
                  {
                    id: "network",
                    name: "network",
                    value: "mono",
                    label: "Use mono IP",
                  },
                  {
                    id: "mac",
                    name: "network",
                    value: "mac",
                    label: "Start with MacOS",
                  },
                ]}
              /> */}
            </div>

            <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
              <Button className="!w-max bg-white" title="Save" type="submit" />
            </div>
          </form>
        )}

        {currentPage === 2 && (
          <>
            <div className="w-full border border-warning bg-warning/10 rounded-lg p-4 font-inter sm:mt-2">
              <div className="flex items-start gap-2 text-xl">
                <img src="/images/cursor-top.png" alt="cursor" />
                <div>
                  <p>Verificate your ID to withdraw money.</p>
                  <Link
                    className="mt-4 inline-block text-sm text-gray-2 border-b border-gray-2"
                    to="/"
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

            <form
              className="flex flex-col mt-6 flex-grow"
              onSubmit={methods.handleSubmit(formHandler)}
            >
              <div className="flex flex-col gap-6">
                <FieldWrapper
                  title="Wallet"
                  error={methods.formState.errors.wallet?.message}
                >
                  <TextField
                    placeholder="Your wallet"
                    methods={methods}
                    registerName="wallet"
                    options={{
                      required: {
                        value: true,
                        message: "Поле обязательно для заполнения",
                      },
                    }}
                  />
                </FieldWrapper>

                <FieldWrapper
                  title="Transaction ID"
                  error={methods.formState.errors.transactionId?.message}
                >
                  <TextField
                    placeholder="ID of your transaction"
                    methods={methods}
                    registerName="transactionId"
                    options={{
                      required: {
                        value: true,
                        message: "Поле обязательно для заполнения",
                      },
                    }}
                  />
                </FieldWrapper>
              </div>

              <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
                <Button
                  className="!w-max bg-white"
                  title={isSuccess ? "Success!" : "Payed"}
                  type="submit"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
