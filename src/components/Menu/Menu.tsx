import cn from "clsx";
import { FC } from "react";
import { PropsWithClassName } from "@/types";
import { MenuItem } from "@/components";
import { LightIcon, OptionsIcon, RocketIcon, WalletIcon } from "../icons";
import styles from "./Menu.module.css";

export const Menu: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <MenuItem
        className="w-1/4 sm:w-1/3 p-1"
        title="Miner"
        icon={<RocketIcon />}
        href="/miner"
      />

      <MenuItem
        className="w-1/4 sm:w-1/3 p-1"
        title="Wallet"
        icon={<WalletIcon />}
        href="/wallet"
      />

      <MenuItem
        className="w-1/4 sm:w-1/3 p-1"
        title="Options"
        icon={<OptionsIcon />}
        href="/options"
      />

      <MenuItem
        className="w-1/4 sm:w-1/3 p-1 sm:hidden"
        title="Buy PRO"
        icon={<LightIcon />}
        href="/pro"
      />
    </div>
  );
};
