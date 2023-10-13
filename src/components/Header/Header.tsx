import { titles } from "@/data";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC } from "react";
import { useLocation } from "react-router-dom";

export const Header: FC<PropsWithClassName> = ({ className }) => {
  const location = useLocation();

  return (
    <header className={cn(className, "flex justify-between items-center py-4")}>
      <div className="flex items-center gap-2 text-[28px] font-semibold text-white [&>svg>path]:fill-[rgba(193,170,255,1)]">
        {titles[location.pathname].icon}

        <span>{titles[location.pathname].title}</span>
      </div>

      {location.pathname === "/miner" && (
        <div className="flex flex-col font-inter">
          <p className="text-[#B6BFCF] text-xs">Balance, USDT</p>

          <p className="text-[#DFDBDD] text-xl font-semibold">$250,603.1</p>
        </div>
      )}
    </header>
  );
};
