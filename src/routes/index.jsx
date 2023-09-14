import { Navigate, Route, Routes } from "react-router-dom";
import { SharedLayout } from "../layouts/SharedLayout";
import { useAccount } from "wagmi";

import { lazy } from "react";

import { ConnectWallet } from "../pages/ConnectWallet";

const Stake = lazy(() => import("../pages/Stake"));
const Withdraw = lazy(() => import("../pages/Withdraw"));
const ClaimRewards = lazy(() => import("../pages/ClaimRewards"));

export const AppRoutes = () => {
  const { isConnected } = useAccount();
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<SharedLayout />}
        >
          <Route
            index
            element={<Navigate to='/stake' />}
          />
          <Route
            path='/stake'
            element={isConnected ? <Stake /> : <ConnectWallet />}
          />
          <Route
            path='/withdraw'
            element={isConnected ? <Withdraw /> : <ConnectWallet />}
          />
          <Route
            path='/claimrewards'
            element={isConnected ? <ClaimRewards /> : <ConnectWallet />}
          />
        </Route>
      </Routes>
    </>
  );
};
