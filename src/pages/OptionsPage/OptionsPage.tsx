import { Button, FieldWrapper, TextField } from "@/components/ui";
import { Radio } from "@/components/ui/Radio/Radio";
import { useState } from "react";
import { Link } from "react-router-dom";

export const OptionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col flex-grow mt-8 mb-[110px]">
      <div className="container flex flex-col flex-grow">
        <div className="hidden sm:flex flex-col">
          <h3 className="text-2xl font-semibold sm:text-center sm:text-3xl">
            Withdraw
          </h3>

          <div className="p-4 bg-base-200/60 sm:bg-transparent sm:text-center sm:text-sm flex-col gap-4 text-xl font-inter mt-4 rounded-lg">
            <p>Minimum withdraw amount — $100</p>
            <p className="text-sm border-b border-white w-max sm:hidden">
              Network TRC-20 (USDT)
            </p>
          </div>
        </div>

        {currentPage === 1 && (
          <form
            className="flex flex-col flex-grow"
            onSubmit={(e) => {
              e.preventDefault();

              setCurrentPage(2);
            }}
          >
            <div className="flex flex-col gap-6">
              <FieldWrapper title="Network">
                <TextField placeholder="Your network" />
              </FieldWrapper>

              <Radio
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
              />
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

            <form className="flex flex-col mt-6 flex-grow">
              <div className="flex flex-col gap-6">
                <FieldWrapper title="Wallet">
                  <TextField placeholder="Your wallet" />
                </FieldWrapper>

                <FieldWrapper title="Transaction ID">
                  <TextField placeholder="ID of your transaction" />
                </FieldWrapper>
              </div>

              <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
                <Button
                  className="!w-max bg-white"
                  title="Payed"
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
