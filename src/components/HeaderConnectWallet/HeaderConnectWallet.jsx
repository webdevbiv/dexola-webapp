import { useAccount, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
// import { roundToDecimalPlaces } from "../../utils/utils";
// import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";
// import { useUserBalanceOfStarRunner } from "../../Hooks";
import srImg from "../../assets/images/crypto/sr.png";
import sepImg from "../../assets/images/crypto/sep.png";
import s from "./HeaderConnectWallet.module.scss";

export const HeaderConnectWallet = () => {
  // Web3Modal
  const { open } = useWeb3Modal();

  //Wagmi data
  const { address: userWalletAddress, isConnected } = useAccount();

  const { data: userBalanceOfSepolia } = useBalance({
    address: userWalletAddress,
    watch: true,
  });

  const formattedWalletAmount = "0";

  //StarRunner
  // const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);

  const userBalanceOfStarRunner = "0";
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
              ? `${userBalanceOfStarRunner} STRU`
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
        <div> Button</div>
        // <ButtonConnectWallet location='header' />d
      )}
    </>
  );
};
