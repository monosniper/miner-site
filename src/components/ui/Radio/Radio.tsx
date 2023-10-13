import styles from "./Radio.module.css";
import {
  FieldValues,
  UseFormReturn,
  Path,
  RegisterOptions,
} from "react-hook-form";
import cn from "clsx";
import { useState } from "react";

type Props<T extends FieldValues> = {
  methods?: UseFormReturn<T>;
  registerName?: Path<T>;
  options?: RegisterOptions;

  list: {
    value: string;
    name: string;
    label: string;
    id: string;
  }[];
};

export const Radio = <T extends FieldValues>({
  methods,
  registerName,
  options,
  list,
}: Props<T>) => {
  const [value, setValue] = useState<string>();

  return (
    <div className="flex flex-wrap gap-6">
      {list.length > 0 &&
        list.map((el, idx) => {
          return (
            <div key={idx}>
              <input
                className="hidden"
                type="radio"
                value={el.value}
                name={el.name}
                id={el.id}
                onChange={() => setValue(el.value)}
                {...methods?.register(registerName!, options)}
              />
              <label className="flex items-center gap-3" htmlFor={el.id}>
                <div
                  className={cn(styles.circle, {
                    [styles.active]: el.value === value,
                  })}
                >
                  <div></div>
                </div>
                {el.label}
              </label>
            </div>
          );
        })}
    </div>
  );
};
