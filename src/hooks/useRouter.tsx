import { Suspense } from "react";
import { lazily } from "react-lazily";
import { Routes, Route, Navigate } from "react-router-dom";

const {
  MinerPage,
  WalletPage,
  OptionsPage,
  ProPage,
  EmptyPage,
  VerificationPage,
} = lazily(() => import("@/pages"));

export const useRouter = (isAuth: boolean) => {
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route
            index
            element={
              <Suspense>
                <Navigate to="/miner" />
              </Suspense>
            }
          />

          <Route
            path="/*"
            element={
              <Suspense>
                <Navigate to="/miner" />
              </Suspense>
            }
          />

          <Route
            path="/miner"
            element={
              <Suspense>
                <MinerPage />
              </Suspense>
            }
          />
          <Route
            path="/wallet"
            element={
              <Suspense>
                <WalletPage />
              </Suspense>
            }
          />
          <Route
            path="/options"
            element={
              <Suspense>
                <OptionsPage />
              </Suspense>
            }
          />
          <Route
            path="/pro"
            element={
              <Suspense>
                <ProPage />
              </Suspense>
            }
          />

          <Route
            path="/verification"
            element={
              <Suspense>
                <VerificationPage />
              </Suspense>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<EmptyPage />} />

          <Route
            index
            element={
              <Suspense>
                <Navigate to="/" />
              </Suspense>
            }
          />

          <Route
            path="/*"
            element={
              <Suspense>
                <Navigate to="/" />
              </Suspense>
            }
          />
        </Routes>
      )}
    </>
  );
};
