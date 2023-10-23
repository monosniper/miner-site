import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const LightIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 40,
  height = 40,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 41 41"
      fill="none"
    >
      <path
        d="M19.6437 6.42839L10.5604 22.3451C10.2162 22.9338 10.2172 23.6626 10.563 24.2504C10.9088 24.8382 11.5453 25.1931 12.2271 25.1784H16.9937C17.6066 25.174 18.1959 25.4143 18.6309 25.8461C19.0658 26.2779 19.3104 26.8655 19.3104 27.4784V33.4951C19.316 34.226 19.7973 34.8679 20.4973 35.0783C21.1973 35.2887 21.9527 35.0184 22.3604 34.4117L31.1604 21.2117C31.5455 20.631 31.5818 19.8859 31.255 19.2705C30.9281 18.655 30.2906 18.2679 29.5937 18.2617H25.0604C23.7901 18.2617 22.7604 17.232 22.7604 15.9617V7.26173C22.7657 6.50274 22.2575 5.83602 21.5243 5.63997C20.791 5.44391 20.0179 5.76804 19.6437 6.42839Z"
        fill="#C6D612"
      />
    </svg>
  );
};
