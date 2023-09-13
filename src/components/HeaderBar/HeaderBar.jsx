import { HeaderConnectWallet } from "../HeaderConnectWallet/HeaderConnectWallet";
import { Logo } from "../Logo/Logo";
import s from "./HeaderBar.module.scss";

export const HeaderBar = () => {
  return (
    <div className={s.container}>
      <Logo />
      <HeaderConnectWallet />
    </div>
  );
};
