import styles from "./Checkbox.module.css";
import cn from "clsx";
import { FC, ChangeEventHandler } from "react";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  isCheckedVal: boolean;
  label: string;
  id: string;
};

export const Checkbox: FC<Props> = ({ onChange, label, isCheckedVal, id }) => {
  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        checked={isCheckedVal}
        onChange={onChange}
      />
      <label className="flex items-center gap-3" htmlFor={id}>
        <div
          className={cn(styles.circle, {
            [styles.active]: isCheckedVal,
          })}
        >
          <div className={styles.circle}></div>
        </div>
        {label}
      </label>
    </div>
  );
};
