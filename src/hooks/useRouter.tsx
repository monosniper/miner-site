import { MinerPage, OptionsPage, WalletPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

export const useRouter = () => {
  return (
    <Routes>
      <Route path="/miner" element={<MinerPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/options" element={<OptionsPage />} />
    </Routes>
  );
};
