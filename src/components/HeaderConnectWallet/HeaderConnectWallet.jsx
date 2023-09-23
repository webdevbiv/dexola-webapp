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

  const formattedBalanceOfSepolia = roundToDecimalPlaces(
    userBalanceOfSepolia?.formatted,
    2
  );

  //StarRunner
  const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);

  const formattedBalanceOfStarRunner = roundToDecimalPlaces(
    Math.floor(userBalanceOfStarRunner?.formatted),
    0
  );

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
              ? `${formattedBalanceOfStarRunner} STRU`
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
