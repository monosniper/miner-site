import { useEffect, useState, useRef } from "react";
import { Coin } from "@/components";
import { coinsIcons } from "@/data/coinsIcons";
import socket from "../../socket";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { coins as coinsSlice } from "../../redux/slices/coinsSlice";
import { miner, setUpdateData, setWork } from "@/redux/slices/minerSlice";

const getCoinData = async (name: string) => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${name}/usd.json`,
  );

  const result = await res.json();

  return result;
};

const coinsFullNames: { [key: string]: string } = {
  btc: "Bitcoin",
  usdt: "Tether",
  eth: "Ethereum",
  doge: "Dogecoin",
  ton: "Toncoin",
};

export const MinerPage = () => {
  const [coins, setCoins] = useState<
    {
      date: string;
      usd: number;
      name: string;
      fullName: string;
      icon: JSX.Element;
    }[]
  >([]);
  const [coinsNames] = useState(["btc", "usdt", "eth", "doge", "ton"]);
  const { selectedCoins } = useAppSelector(coinsSlice);
  const { atWork, updateData } = useAppSelector(miner);
  const checkedRef = useRef<HTMLDivElement>(null);
  const foundsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const coinDataArray = await Promise.all(
        coinsNames.map(async (coin) => {
          const data = await getCoinData(coin);
          return {
            name: coin,
            fullName: coinsFullNames[coin],
            icon: coinsIcons[coin],
            ...data,
          };
        }),
      );

      setCoins(coinDataArray);
    };

    fetchData();
  }, [coinsNames]);

  const startMiner = () => {
    if (selectedCoins.length > 0) {
      socket.emit("start", {
        data: selectedCoins,
      });

      dispatch(setWork(true));
    }
  };

  const stopMiner = () => {
    socket.emit("stop", null);

    dispatch(setWork(false));
  };

  useEffect(() => {
    socket.on("update", (data) => {
      dispatch(setUpdateData(data));
      console.log(data);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!checkedRef.current) return;

    checkedRef.current.scrollTo(0, checkedRef.current.scrollHeight);
  }, [updateData]);

  useEffect(() => {
    if (!foundsRef.current) return;

    foundsRef.current.scrollTo(0, foundsRef.current.scrollHeight);
  }, [updateData]);

  return (
    <div className="mb-[110px] sm:mb-0">
      <div className="sm:pt-5">
        <div>
          <div className="container">
            <div className="flex flex-wrap -m-2">
              {coins.map((el, idx) => {
                return (
                  <div className="w-full sm:w-1/2 p-2" key={idx}>
                    <Coin
                      fullName={el.fullName}
                      name={el.name}
                      course={Number(el.usd.toFixed(2))}
                      icon={el.icon}
                    />
                  </div>
                );
              })}
            </div>

            {!atWork ? (
              <button
                className="px-12 py-3 flex items-center gap-2 justify-center mx-auto mt-5 bg-white text-xl sm:text-base font-inter rounded-full text-black w-full sm:w-max"
                onClick={startMiner}
              >
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path
                    d="M14.7665 7.83329L8.73316 4.34996C7.96069 3.90397 7.00913 3.90333 6.23606 4.34827C5.463 4.79321 4.98555 5.61633 4.98315 6.50829V13.4916C4.98555 14.3836 5.463 15.2067 6.23606 15.6516C7.00913 16.0966 7.96069 16.0959 8.73316 15.65L14.7665 12.1666C15.5416 11.7205 16.0193 10.8943 16.0193 9.99996C16.0193 9.10565 15.5416 8.27945 14.7665 7.83329Z"
                    fill="black"
                  />
                </svg>
                <span>Start</span>
              </button>
            ) : (
              <button
                className="px-12 py-3 flex items-center gap-2 justify-center mx-auto mt-5 bg-white text-xl sm:text-base font-inter rounded-full text-black w-full sm:w-max"
                onClick={stopMiner}
              >
                <div className="w-2 h-2 rounded-sm bg-black"></div>
                <span>Stop</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 sm:mt-8 bg-[#16191B] py-5 border-t border-base-border-100 max-w-[652px] mx-auto">
          <div>
            <div className="container">
              <div className="flex flex-wrap -m-2">
                <div className="w-full sm:w-1/2 p-2">
                  <div className="bg-[#1E1F25] py-2 px-3 rounded-lg border border-[#444E54]">
                    <div className="flex items-center gap-1 text-xl font-semibold sm:text-base sm:font-medium">
                      <h5 className="text-[rgba(229,233,235,1)]">Checked:</h5>
                      <p className="text-[rgba(193,170,255,1)]">
                        {updateData?.checks.length || 0}
                      </p>
                    </div>

                    <div
                      className="mt-3 pt-3 border-t border-[#444E54] flex flex-col gap-2 sm:gap-1 max-h-[69px] overflow-y-auto scrollbar-none"
                      ref={checkedRef}
                    >
                      {updateData?.checks.map((el, idx) => {
                        const splitText = el.text.split(":");

                        return (
                          <div
                            key={idx}
                            className="flex gap-3 text-sm sm:text-xs"
                          >
                            <p className="text-[rgba(88,102,126,1)]">el.name</p>

                            <p className="text-[rgba(229,233,235,1)] truncate">
                              {splitText[0]}:{" "}
                              <span className="text-[rgba(193,170,255,1)]">
                                {splitText[1]}
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 p-2">
                  <div className="bg-[#1E1F25] py-2 px-3 rounded-lg border border-[#444E54]">
                    <div className="flex items-center gap-1 text-xl font-semibold sm:text-base sm:font-medium">
                      <h5 className="text-[rgba(229,233,235,1)]">Found:</h5>
                      <p className="text-[rgba(193,170,255,1)]">
                        {updateData?.founds.length || 0}
                      </p>
                    </div>

                    <div
                      className="mt-3 pt-3 border-t border-[#444E54] flex flex-col gap-2 sm:gap-1 max-h-[69px] overflow-y-auto scrollbar-none"
                      ref={foundsRef}
                    >
                      {updateData?.founds.map((el, idx) => {
                        const currentCoin = coins.find(
                          (item) =>
                            el.name.toLowerCase() === item.name.toLowerCase(),
                        );

                        const coinAmount = currentCoin
                          ? el.amount / currentCoin.usd
                          : el.amount;

                        return (
                          <div
                            key={idx}
                            className="flex gap-3 text-sm sm:text-xs"
                          >
                            <p className="text-[rgba(88,102,126,1)]">
                              {el.name}
                            </p>

                            <p className="text-[rgba(229,233,235,1)]">
                              {currentCoin ? el.name : "$"} {coinAmount} {" ~ "}
                              <span className="text-[rgba(193,170,255,1)]">
                                ${el.amount}
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* <div className="w-full p-2">
                  <div className="bg-[#1E1F25] py-2 px-3 rounded-lg border border-[#444E54]">
                    <div className="flex flex-wrap">
                      <div className="w-full sm:w-1/3 p-1">
                        <div className="flex gap-3 text-sm sm:text-xs sm:flex-col sm:gap-0">
                          <p className="text-[rgba(88,102,126,1)]">BTC</p>

                          <p className="text-[rgba(229,233,235,1)]">
                            Found:{" "}
                            <span className="text-[rgba(193,170,255,1)]">
                              0X5342FKDSFKSDFI
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-1/3 p-1">
                        <div className="flex gap-3 text-sm sm:text-xs sm:flex-col sm:gap-0">
                          <p className="text-[rgba(88,102,126,1)]">BTC</p>

                          <p className="text-[rgba(229,233,235,1)]">
                            Found:{" "}
                            <span className="text-[rgba(193,170,255,1)]">
                              0X5342FKDSFKSDFI
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-1/3 p-1">
                        <div className="flex gap-3 text-sm sm:text-xs sm:flex-col sm:gap-0">
                          <p className="text-[rgba(88,102,126,1)]">BTC</p>

                          <p className="text-[rgba(229,233,235,1)]">
                            Found:{" "}
                            <span className="text-[rgba(193,170,255,1)]">
                              0X5342FKDSFKSDFI
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
