export type User = {
  id: number;
  name: string;
  options: {
    network?: string;
  };
  token: string;
  username: string;
  balance: { [key: string]: number };
  isPro: boolean;
  ref_code: string;
};
