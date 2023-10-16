import { Button, FieldWrapper, TextField } from "@/components/ui";
import { Link } from "react-router-dom";

export const VerificationPage = () => {
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
              <div className="w-full">
                <TextField placeholder="Your wallet" disabled={true} />
              </div>
            </FieldWrapper>
          </div>

          <div className="mx-auto mt-auto sm:mt-10 pt-5 sm:pt-0">
            <Button className="!w-max bg-white" title={"Payed"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
