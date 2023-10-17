import s from "./MainConnectWallet.module.scss";
import img from "../../assets/images/icons/connect.svg";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";

export const MainConnectWallet = () => {
  return (
    <div className={`mainContainer ${s.container}`}>
      <div className={s.wrapper}>
        <div className={s.contentWrapper}>
          <img
            src={img}
            className={s.img}
            alt='wallet not connected'
          />
          <h2 className={s.title}>
            To start staking you need to connect your wallet first
          </h2>
        </div>
        <ButtonConnectWallet location='main' />
      </div>
    </div>
  );
};
