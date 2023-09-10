import { HeaderButton } from "../HeaderButton/HeaderButton";
import { Logo } from "../Logo/Logo";
import s from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />
        <HeaderButton text={"connect wallet"} />
      </div>
    </header>
  );
};
