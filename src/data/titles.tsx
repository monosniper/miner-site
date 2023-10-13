import {
  LightIcon,
  OptionsIcon,
  RocketIcon,
  WalletIcon,
} from "@/components/icons";

export const titles: { [key: string]: { title: string; icon: JSX.Element } } = {
  "/miner": {
    title: "Miner",
    icon: <RocketIcon />,
  },

  "/wallet": {
    title: "Wallet",
    icon: <WalletIcon />,
  },

  "/options": {
    title: "Options",
    icon: <OptionsIcon />,
  },

  "/pro": {
    title: "Pro",
    icon: <LightIcon />,
  },
};
