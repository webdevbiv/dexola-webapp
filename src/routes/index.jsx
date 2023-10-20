import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SharedLayout } from "../layouts/SharedLayout";
import { MainConnectWallet as ConnectWallet } from "../components/MainConnectWallet/MainConnectWallet";
import { useAccount } from "wagmi";

const Stake = lazy(() => import("../components/MainStake/MainStake"));
const Withdraw = lazy(() => import("../components/MainWithdraw/MainWithdraw"));
const ClaimRewards = lazy(() =>
  import("../components/MainClaimRewards/MainClaimRewards")
);

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
