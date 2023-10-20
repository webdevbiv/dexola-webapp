import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SharedLayout } from "../layouts/SharedLayout";
import { MainConnectWallet as ConnectWallet } from "../components/MainConnectWallet/MainConnectWallet";
import { useUserWalletStatus } from "../Hooks/";

const Stake = lazy(() => import("../components/MainStake/MainStake"));
const Withdraw = lazy(() => import("../components/MainWithdraw/MainWithdraw"));
const ClaimRewards = lazy(() =>
  import("../components/MainClaimRewards/MainClaimRewards")
);

export const AppRoutes = () => {
  const { userWalletIsConnected } = useUserWalletStatus();
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
            element={userWalletIsConnected ? <Stake /> : <ConnectWallet />}
          />
          <Route
            path='/withdraw'
            element={userWalletIsConnected ? <Withdraw /> : <ConnectWallet />}
          />
          <Route
            path='/claimrewards'
            element={
              userWalletIsConnected ? <ClaimRewards /> : <ConnectWallet />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
