import logo from "../../assets/images/icons/logo.svg";
import s from "./Logo.module.scss";
export const Logo = () => {
  return <img src={logo} alt="logo" className={s.logo} />;
};
