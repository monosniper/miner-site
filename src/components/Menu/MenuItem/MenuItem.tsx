import { Link, useLocation } from "react-router-dom";
import cn from "clsx";
import { FC } from "react";
import styles from "./MenuItem.module.css";
import { PropsWithClassName } from "@/types";

type Props = {
  icon: JSX.Element;
  title: string;
  href: string;
};

export const MenuItem: FC<PropsWithClassName<Props>> = ({
  className,
  icon = <></>,
  title = "",
  href = "/",
}) => {
  const location = useLocation();

  return (
    <Link
      className={cn(className, styles.item, {
        [styles.isOpen]: location.pathname === href,
      })}
      to={href}
    >
      {icon}

      <span>{title}</span>
    </Link>
  );
};
