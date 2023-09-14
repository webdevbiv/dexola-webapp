import s from "./MainConnectWallet.module.scss";
import img from "../../assets/images/icons/connect.svg";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";
export const MainConnectWallet = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <img
          src={img}
          className={s.img}
          alt='wallet not connected'
        />
        <h2 className={s.title}>
          To start staking you need <br />
          to connect you wallet first
        </h2>
        <ButtonConnectWallet location='main' />
      </div>
    </div>
  );
};
