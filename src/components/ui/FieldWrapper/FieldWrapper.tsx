import { PropsWithClassName } from "@/types";
import { FC, ReactNode } from "react";
import cn from "clsx";
import styles from "./FieldWrapper.module.css";

type Props = {
  children: ReactNode;
  title: string;
  error?: string;
};

export const FieldWrapper: FC<PropsWithClassName<Props>> = ({
  className,
  children,
  title = "",
  error,
}) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title}</p>
      {children}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
