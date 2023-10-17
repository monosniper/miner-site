export const getCoinData = async (name: string) => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${name}/usd.json`,
  );

  const result = await res.json();

  return result;
};
