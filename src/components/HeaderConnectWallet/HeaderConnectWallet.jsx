import { useAccount, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { roundToDecimalPlaces } from "../../utils/utils";
import ButtonConnectWallet from "../ButtonConnectWallet/ButtonConnectWallet";
import { useUserBalanceOfStarRunner, useWindowWidth } from "../../Hooks";

import starRunnerImg from "../../assets/images/crypto/sr.webp";
import starRunnerImgMobile from "../../assets/images/crypto/sr.png";
import sepoliaImg from "../../assets/images/crypto/sep.webp";
import sepoliaImgMobile from "../../assets/images/crypto/sep.png";
import s from "./HeaderConnectWallet.module.scss";
import { MEDIUM_WIDTH, TOKEN } from "../../constants/constants";

export const HeaderConnectWallet = () => {
  const windowWidth = useWindowWidth();
  // Web3Modal
  const { open } = useWeb3Modal();

  //Wagmi User Account data
  const { address: userWalletAddress, isConnected } = useAccount();

  // User balance of Sepolia
  const { data: userBalanceOfSepolia } = useBalance({
    address: userWalletAddress,
    watch: true,
  });

  //User balance of StarRunner
  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
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
            src={
              windowWidth < MEDIUM_WIDTH ? starRunnerImgMobile : starRunnerImg
            }
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfStarRunner
              ? `${roundToDecimalPlaces(
                  userBalanceOfStarRunner?.formatted,
                  2
                )} STRU`
              : "0 STRU"}
          </div>
          <img
            src={windowWidth < MEDIUM_WIDTH ? sepoliaImgMobile : sepoliaImg}
            alt='sr'
            className={s.walletLogo}
          />
          <div className={s.walletValues}>
            {userBalanceOfSepolia
              ? `${roundToDecimalPlaces(
                  userBalanceOfSepolia?.formatted,
                  2
                )} ETH`
              : "0 ETH"}
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
