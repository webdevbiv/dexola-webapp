import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <NavLink to="/stake">Stake</NavLink>
      <NavLink to="/withdraw">Withdraw</NavLink>
      <NavLink to="/claimrewards">ClaimRewards</NavLink>
    </nav>
  );
};
