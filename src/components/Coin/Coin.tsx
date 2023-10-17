import { coins, setSelectedCoins } from "@/redux/slices/coinsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FC, useState, useEffect } from "react";
import cn from "clsx";
import { miner } from "@/redux/slices/minerSlice";

type Props = {
  icon: JSX.Element;
  fullName: string;
  name: string;
  course: number;
  disabled?: boolean;
  type?: "miner" | "balance";
};

export const Coin: FC<Props> = ({
  icon,
  fullName,
  name,
  course,
  disabled,
  type = "miner",
}) => {
  const dispatch = useAppDispatch();
  const { selectedCoins } = useAppSelector(coins);
  const [isSelected, setSelected] = useState(false);
  const { atWork } = useAppSelector(miner);

  const onClickHandler = () => {
    if (atWork || name === "usdt") return;

    const findCoin = selectedCoins.find((el) => el === name);

    if (findCoin) {
      dispatch(setSelectedCoins(selectedCoins.filter((el) => el !== name)));

      return setSelected(false);
    }

    dispatch(setSelectedCoins([...selectedCoins, name]));
  };

  useEffect(() => {
    if (!selectedCoins || selectedCoins.length === 0) return;

    const findedCoin = selectedCoins.find((el) => el === name);

    return setSelected(findedCoin ? true : false);
  }, [name, selectedCoins]);

  return (
    <div
      className={cn(
        "p-3 bg-[#1E1F25] flex items-center gap-4 w-full h-full border border-base-border-100 rounded-lg font-inter cursor-pointer",
        {
          "border !border-[#5B39B8] bg-base-200 bg-gradient-500": isSelected,
          "cursor-not-allowed opacity-70": atWork || name === "usdt",
          "pointer-events-none": disabled,
        },
      )}
      onClick={onClickHandler}
    >
      <div className="min-w-[44px] w-11 h-11 rounded-lg flex justify-center items-center bg-[rgba(68,78,84,0.30)]">
        {icon}
      </div>

      <div className="w-full flex flex-col gap-1">
        <p className="text-[#B6BFCF] text-xs">{`${fullName}, ${name}`}</p>

        <div className="flex items-center justify-between gap-2">
          <p className="text-[rgba(223,219,221,1)] text-xl sm:text-lg font-medium ">
            {type !== "balance" && "$"}
            {course}
          </p>

          {/* <div className="flex items-center gap-1 text-[#EB4141] font-medium text-base sm:text-lg">
            <p>0,15%</p>

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.81525 2C7.65008 2 7.51456 2.05294 7.40868 2.15881C7.30281 2.26046 7.24987 2.39386 7.24987 2.55903V10.9254L7.31339 12.8184L7.66914 12.6914L5.39492 10.1948L3.94653 8.77184C3.89571 8.72102 3.8343 8.6829 3.76231 8.65749C3.69455 8.63208 3.62255 8.61938 3.54632 8.61938C3.38962 8.61938 3.25834 8.67231 3.15246 8.77819C3.05082 8.88407 3 9.01535 3 9.17205C3 9.32451 3.05929 9.46215 3.17787 9.58497L7.38962 13.8094C7.45315 13.8729 7.52091 13.9195 7.59291 13.9492C7.6649 13.9831 7.73902 14 7.81525 14C7.89571 14 7.97194 13.9831 8.04394 13.9492C8.11593 13.9195 8.18158 13.8729 8.24087 13.8094L12.459 9.58497C12.5733 9.46215 12.6305 9.32451 12.6305 9.17205C12.6305 9.01535 12.5776 8.88407 12.4717 8.77819C12.37 8.67231 12.2409 8.61938 12.0842 8.61938C12.0079 8.61938 11.9338 8.63208 11.8618 8.65749C11.7941 8.6829 11.7348 8.72102 11.684 8.77184L10.2356 10.1948L7.955 12.6914L8.3171 12.8184L8.38062 10.9254V2.55903C8.38062 2.39386 8.32769 2.26046 8.22181 2.15881C8.11593 2.05294 7.98041 2 7.81525 2Z"
                fill="#EB4141"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
};
