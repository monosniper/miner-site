import { MinerPage, OptionsPage, ProPage, WalletPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

export const useRouter = () => {
  return (
    <Routes>
      <Route path="/miner" element={<MinerPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/options" element={<OptionsPage />} />
      <Route path="/pro" element={<ProPage />} />
    </Routes>
  );
};
