import { PropsWithClassName } from "@/types";
import { FC, MouseEventHandler } from "react";
import cn from "clsx";
import styles from "./Button.module.css";

type Props = {
  type?: "button" | "submit";
  title: string;
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button: FC<PropsWithClassName<Props>> = ({
  className,
  type = "button",
  title = "",
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={cn(className, styles.btn)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}

      <span>{title}</span>
    </button>
  );
};
