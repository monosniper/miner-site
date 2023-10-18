export type User = {
  id: number;
  name: string;
  options: {
    network?: string;
    mono_ip?: boolean;
  };
  token: string;
  username: string;
  balance: { [key: string]: number };
  status: string;
  ref_code: string;
  demo_time: number;
  demo_expired?: boolean;
};
