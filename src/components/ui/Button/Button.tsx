import { PropsWithClassName } from "@/types";
import { FC, MouseEventHandler } from "react";
import cn from "clsx";
import styles from "./Button.module.css";

type Props = {
  type?: "button" | "submit";
  title: string;
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button: FC<PropsWithClassName<Props>> = ({
  className,
  type = "button",
  title = "",
  icon,
  onClick,
}) => {
  return (
    <button className={cn(className, styles.btn)} type={type} onClick={onClick}>
      {icon && icon}

      <span>{title}</span>
    </button>
  );
};
