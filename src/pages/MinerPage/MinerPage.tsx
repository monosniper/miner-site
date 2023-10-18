import { useEffect, useState, useRef } from "react";
import { Coin } from "@/components";
import socket from "../../socket";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { coins as coinsSlice } from "../../redux/slices/coinsSlice";
import { miner, setUpdateData, setWork } from "@/redux/slices/minerSlice";
import { setSumCoins, setUserData, user } from "@/redux/slices/userSlice";
import { useSetBalanceMutation } from "@/redux/api/walletApi";
import { coinsIcons } from "@/data/coinsIcons";
import { toast } from "react-toastify";

export const MinerPage = () => {
  const { coins } = useAppSelector(coinsSlice);
  const { selectedCoins } = useAppSelector(coinsSlice);
  const { atWork, updateData } = useAppSelector(miner);
  const checkedRef = useRef<HTMLDivElement>(null);
  const foundsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { sumCoins, userData, isBlockedMiner } = useAppSelector(user);
  const [loading, setLoading] = useState(false);
  const [setBalance, { data: balanceData }] = useSetBalanceMutation();
  const [prevFounds, setPrevFounds] = useState<
    {
      name: string;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    if (!balanceData) return;

    dispatch(setUserData(balanceData));
  }, [balanceData, dispatch]);

  const startMiner = () => {
    if (selectedCoins.length > 0) {
      setLoading(true);

      socket.emit("start", {
        data: selectedCoins,
      });

      dispatch(setSumCoins(undefined));
    } else {
      toast.error("Select at least one coin");
    }
  };

  const stopMiner = () => {
    setLoading(true);

    socket.emit("stop", null);
  };

  useEffect(() => {
    socket.on("stopped", () => {
      dispatch(setWork(false));
      setLoading(false);
    });

    return () => {
      socket.off("stopped");
    };
  }, [dispatch, setBalance, sumCoins, userData]);

  useEffect(() => {
    socket.on("started", () => {
      dispatch(setWork(true));
      setLoading(false);
    });

    return () => {
      socket.off("started");
    };
  }, [dispatch, sumCoins, userData]);

  useEffect(() => {
    socket.on("update", (data) => {
      dispatch(setUpdateData(data));
    });

    return () => {
      socket.off("update");
    };
  }, [dispatch, updateData]);

  useEffect(() => {
    if (!checkedRef.current) return;

    checkedRef.current.scrollTo(0, checkedRef.current.scrollHeight);
  }, [updateData]);

  useEffect(() => {
    if (!foundsRef.current) return;

    foundsRef.current.scrollTo(0, foundsRef.current.scrollHeight);
  }, [updateData]);

  useEffect(() => {
    if (!userData || !sumCoins) return;

    const balance = { ...userData.balance };

    for (const coin in sumCoins) {
      if (balance[coin]) {
        balance[coin] += sumCoins[coin];
      } else {
        balance[coin] = sumCoins[coin];
      }
    }

    let sumUsdt = 0;

    for (const coin in balance) {
      if (coin !== "usdt") {
        sumUsdt += balance[coin];
      }
    }

    balance["usdt"] = sumUsdt;

    setBalance(balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sumCoins]);

  useEffect(() => {
    if (!updateData) return;

    const usdtCourse = coins.find((el) => el.name === "usdt")?.usd;

    if (!usdtCourse) return;

    const { founds } = updateData;

    if (founds.length === 0) return;

    if (prevFounds.length === founds.length) return;

    setPrevFounds(founds);

    const sumCoins: { [name: string]: number } = {};

    const lastFound = founds[founds.length - 1];

    sumCoins[lastFound.name.toLowerCase()] = lastFound.amount / usdtCourse;

    dispatch(setSumCoins(sumCoins));
  }, [updateData, dispatch, coins, prevFounds.length]);

  return (
    <div className="mb-[110px] sm:mb-0">
      <div className="sm:pt-5">
        <div>
          <div className="container">
            <div className="hidden sm:block mb-5 ml-auto w-max">
              Balance, USDT - ${userData?.balance.usdt?.toFixed(6) || 0}
            </div>

            <div className="flex flex-wrap -m-2">
              {coins
                .filter((el) => el.name !== "usdt")
                .map((el, idx) => {
                  return (
                    <div className="w-full sm:w-1/2 p-2" key={idx}>
                      <Coin
                        fullName={el.fullName}
                        name={el.name}
                        course={Number(el.usd.toFixed(2))}
                        icon={coinsIcons[el.name]}
                      />
                    </div>
                  );
                })}
            </div>

            {!atWork ? (
              <button
                className="disabled:opacity-60 ease-linear duration-200 px-12 py-3 flex items-center gap-2 justify-center mx-auto mt-5 bg-white text-xl sm:text-base font-inter rounded-full text-black w-full sm:w-max"
                onClick={startMiner}
                disabled={isBlockedMiner || loading}
              >
                {!loading && (
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path
                      d="M14.7665 7.83329L8.73316 4.34996C7.96069 3.90397 7.00913 3.90333 6.23606 4.34827C5.463 4.79321 4.98555 5.61633 4.98315 6.50829V13.4916C4.98555 14.3836 5.463 15.2067 6.23606 15.6516C7.00913 16.0966 7.96069 16.0959 8.73316 15.65L14.7665 12.1666C15.5416 11.7205 16.0193 10.8943 16.0193 9.99996C16.0193 9.10565 15.5416 8.27945 14.7665 7.83329Z"
                      fill="black"
                    />
                  </svg>
                )}
                <span>{loading ? "Loading..." : "Start"}</span>
              </button>
            ) : (
              <button
                className="disabled:opacity-60 ease-linear duration-200 px-12 py-3 flex items-center gap-2 justify-center mx-auto mt-5 bg-white text-xl sm:text-base font-inter rounded-full text-black w-full sm:w-max"
                onClick={stopMiner}
                disabled={loading}
              >
                <div className="w-2 h-2 rounded-sm bg-black"></div>
                <span>{loading ? "Loading..." : "Stop"}</span>
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
                            <p className="text-[rgba(88,102,126,1)]">
                              {el.name}
                            </p>

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
                            el.name.toLowerCase() === item.name.toLowerCase()
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
