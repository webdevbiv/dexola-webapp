import { NavLink } from "react-router-dom";
import navLinks from "./navLinks";
import s from "./Nav.module.scss";

export const Nav = () => {
  return (
    <div className={s.container}>
      <nav className={s.nav}>
        {navLinks.map((link) => (
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
