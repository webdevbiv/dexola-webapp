import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";

export const Nav = () => {
  const links = [
    { path: "/stake", label: "Stake" },
    { path: "/withdraw", label: "Withdraw" },
    { path: "/claimrewards", label: "Claim rewards" },
  ];

  return (
    <div className={s.container}>
      <nav className={s.nav}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.linkSelected}` : `${s.link}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
