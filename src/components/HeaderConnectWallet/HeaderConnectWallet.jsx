import { useAccount, useBalance } from "wagmi";
import { roundToDecimalPlaces } from "../../utils/utils";
import { TOKEN_ADDRESS } from "../../constants/constants";
import srImg from "../../assets/images/crypto/sr.png";
import sepImg from "../../assets/images/crypto/sep.png";
import s from "./HeaderConnectWallet.module.scss";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";

export const HeaderConnectWallet = () => {
  //Wagmi data
  const { address: userWalletAddress, isConnected } = useAccount();

  const { data: userBalanceOfSepolia } = useBalance({
    address: userWalletAddress,
    watch: true,
  });

  const formattedWalletAmount = roundToDecimalPlaces(
    userBalanceOfSepolia?.formatted,
    1
  );

  //StarRunner
  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN_ADDRESS,
    watch: true,
  });

  return (
    <>
      {isConnected ? (
        <div
          className={s.container}
          onClick={() => open()}
        >
          <img
            src={srImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfStarRunner
              ? `${userBalanceOfStarRunner.formatted} STRU`
              : "Invalid data "}
          </div>
          <img
            src={sepImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfSepolia
              ? `${formattedWalletAmount} ETH`
              : "Invalid data"}
          </div>
        </div>
      ) : (
        <ButtonConnectWallet location='header' />
      )}
    </>
  );
};
