import { MinerPage } from "@/pages";
import { Routes, Route } from "react-router-dom";

export const useRouter = () => {
  return (
    <Routes>
      <Route path="/miner" element={<MinerPage />} />
    </Routes>
  );
};
