import { ChangeEventHandler } from "react";
import styles from "./TextField.module.css";
import {
  Path,
  RegisterOptions,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { PropsWithClassName } from "@/types";
import cn from "clsx";

type Props<T extends FieldValues> = {
  type?: "text" | "password" | "number";
  placeholder?: string;
  methods?: UseFormReturn<T>;
  registerName?: Path<T>;
  options?: RegisterOptions;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string;
  disabled?: boolean;

  select?: {
    value: string | number;
    isOpen: boolean;
    list: { value: string | number; title: string }[];
    onChange: (value: string | number) => void;
  };
};

export const TextField = <T extends FieldValues>({
  className,
  type = "text",
  placeholder,
  methods,
  registerName,
  options,
  onChange,
  value,
  disabled = false,

  select,
}: PropsWithClassName<Props<T>>) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...methods?.register(registerName!, options)}
      />

      {select && (
        <div className="relative">
          <div className="flex items-center gap-1">
            <span>{select.value}</span>
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path
                d="M1.00012 1.25L4.50012 4.75L8.00012 1.25"
                stroke="white"
                strokeWidth="1.16667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {select.list.length > 0 && (
            <div className="absolute top-[calc(100%+5px)] flex flex-col gap-1 overflow-y-auto bg-red-500 p-2"></div>
          )}
        </div>
      )}
    </div>
  );
};
