import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const WalletIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 40,
  height = 40,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8334 13.1818C18.8334 15.2738 17.1375 16.9697 15.0455 16.9697H5.95463C3.86264 16.9697 2.16675 15.2738 2.16675 13.1818V7.12119C2.16675 5.0292 3.86264 3.33331 5.95463 3.33331H15.0455C17.1375 3.33331 18.8334 5.0292 18.8334 7.12119V13.1818ZM18.8334 11.0682V9.23483H15.0455C14.5393 9.23483 14.1289 9.64523 14.1289 10.1515C14.1289 10.6578 14.5393 11.0682 15.0455 11.0682H18.8334Z"
        fill="#5D636D"
      />
    </svg>
  );
};
