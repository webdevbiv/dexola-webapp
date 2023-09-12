import { HeaderButton } from "../HeaderButton/HeaderButton";
import { Logo } from "../Logo/Logo";
import s from "./HeaderBar.module.scss";

export const HeaderBar = () => {
  return (
    <div className={s.container}>
      <Logo />
      <HeaderButton />
    </div>
  );
};
