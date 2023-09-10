import { HeaderButton } from "../HeaderButton/HeaderButton";
import { Logo } from "../Logo/Logo";
import s from "./Header.module.scss";

const handleWalletConnect = () => {
  console.log("handleWalletConnect");
};
export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />
        <HeaderButton
          text={"connect wallet"}
          onClick={handleWalletConnect}
        />
      </div>
    </header>
  );
};
