import { useAccount, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { roundToDecimalPlaces } from "../../utils/utils";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";
import { useUserBalanceOfStarRunner, useWindowWidth } from "../../Hooks";

import starRunnerImg from "../../assets/images/crypto/sr.webp";
import sepoliaImg from "../../assets/images/crypto/sep.webp";
import s from "./HeaderConnectWallet.module.scss";
import { MEDIUM_WIDTH } from "../../constants/constants";

export const HeaderConnectWallet = () => {
  const windowWidth = useWindowWidth();
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
  const userBalanceOfStarRunner = useUserBalanceOfStarRunner({
    userWalletAddress,
    formatted: true,
  });

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
              : "0 STRU"}
          </div>
          <img
            src={sepoliaImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {formattedBalanceOfSepolia
              ? Number(formattedBalanceOfSepolia) % 1 === 0 // Check if it's a whole number
                ? `${Math.floor(formattedBalanceOfSepolia)} ETH` // Display as a whole number
                : `${formattedBalanceOfSepolia} ETH` // Display with decimals
              : "Invalid data"}
            {windowWidth >= MEDIUM_WIDTH && userWalletAddress && (
              <div className={s.walletAddress}>
                <span>|</span>
                <span>{userWalletAddress.slice(0, 16)}...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ButtonConnectWallet location='header' />
      )}
    </>
  );
};
