export type Update = {
  checks: {
    name: string;
    text: string;
  }[];
  founds: {
    name: string;
    amount: number;
  }[];
  logs: any;
};
