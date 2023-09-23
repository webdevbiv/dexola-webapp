import { useAccount, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { roundToDecimalPlaces } from "../../utils/utils";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";
import { useUserBalanceOfStarRunner } from "../../Hooks";
import starRunnerImg from "../../assets/images/crypto/sr.png";
import sepoliaImg from "../../assets/images/crypto/sep.png";
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

  // User balance of Sepolia
  const formattedBalanceOfSepolia = roundToDecimalPlaces(
    userBalanceOfSepolia?.formatted,
    2
  );

  //User balance of StarRunner
  const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);

  return (
    <>
      {isConnected ? (
        <div
          className={s.container}
          onClick={() => open()}
        >
          <img
            src={starRunnerImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfStarRunner
              ? `${userBalanceOfStarRunner} STRU`
              : "Invalid data "}
          </div>
          <img
            src={sepoliaImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfSepolia
              ? `${formattedBalanceOfSepolia} ETH`
              : "Invalid data"}
          </div>
        </div>
      ) : (
        <ButtonConnectWallet location='header' />
      )}
    </>
  );
};
