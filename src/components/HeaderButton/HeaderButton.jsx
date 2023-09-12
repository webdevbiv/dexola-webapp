import s from "./HeaderButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
export const HeaderButton = () => {
  const { open } = useWeb3Modal();
  return (
    <button
      className={s.button}
      onClick={() => open()}
    >
      connect wallet
    </button>
  );
};
