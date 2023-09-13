import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useBalance } from "wagmi";
import { parseAndRound } from "../../utils/utils";
import { TOKEN_ADDRESS } from "../../constants/constants";
import s from "./HeaderConnectWallet.module.scss";

export const HeaderConnectWallet = () => {
  // Open Web3Modal
  const { open } = useWeb3Modal();

  //Wagmi data
  const { address: userWalletAddress, isConnected } = useAccount();

  const { data: userBalanceOfSepolia } = useBalance({
    address: userWalletAddress,
    watch: true,
  });

  const formattedWalletAmount = parseAndRound(
    userBalanceOfSepolia?.formatted,
    1
  );

  //StarRunner
  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN_ADDRESS,
    watch: true,
  });

  console.log(userBalanceOfSepolia, userBalanceOfStarRunner);

  return (
    <>
      {isConnected ? (
        <div onClick={() => open()}>
          {userBalanceOfSepolia
            ? `${formattedWalletAmount} ${userBalanceOfSepolia.symbol}`
            : "Invalid data"}
        </div>
      ) : (
        <button
          className={s.button}
          onClick={() => open()}
        >
          connect wallet
        </button>
      )}
    </>
  );
};
