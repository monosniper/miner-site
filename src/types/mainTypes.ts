export type PropsWithClassName<P = unknown> = P & {
  className?: string;
};

export type PropsWithSize<P = unknown> = P & {
  width?: number;
  height?: number;
};

export type SelectItemWithIcon = {
  value: string;
  icon?: JSX.Element | string;
};
