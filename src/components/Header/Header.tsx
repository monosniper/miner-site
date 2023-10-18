import { titles } from "@/data";
import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: FC<PropsWithClassName> = ({ className }) => {
  const location = useLocation();
  const { userData } = useAppSelector(user);

  return (
    <div className="container">
      <header
        className={cn(
          className,
          "flex justify-between items-end py-4 flex-wrap gap-y-3",
        )}
      >
        <div className="flex items-center gap-2 text-[28px] font-semibold text-white [&>svg>path]:fill-[rgba(193,170,255,1)]">
          {titles[location.pathname]?.icon
            ? titles[location.pathname]?.icon
            : null}

          <span className="max-w-[280px] w-full">
            {titles[location.pathname]?.title
              ? titles[location.pathname]?.title
              : null}
          </span>
        </div>

        {location.pathname === "/pro" && (
          <Link
            className="inline-block text-sm text-gray-2 border-b border-gray-2"
            to="/"
          >
            Know more
          </Link>
        )}

        {location.pathname === "/miner" && (
          <div className="flex flex-col font-inter">
            <p className="text-[#B6BFCF] text-xs">Balance, USDT</p>

            <p className="text-[#DFDBDD] text-xl font-semibold">
              ${userData?.balance.usdt?.toFixed(6) || 0}
            </p>
          </div>
        )}
      </header>
    </div>
  );
};
