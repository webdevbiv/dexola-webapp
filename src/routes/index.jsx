import { Navigate, Route, Routes } from "react-router-dom";
import { SharedLayout } from "../layouts/SharedLayout";
import { lazy } from "react";

const Stake = lazy(() => import("../pages/Stake"));
const Withdraw = lazy(() => import("../pages/Withdraw"));
const ClaimRewards = lazy(() => import("../pages/ClaimRewards"));

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="/stake" />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/claimrewards" element={<ClaimRewards />} />
        </Route>
      </Routes>
    </>
  );
};
