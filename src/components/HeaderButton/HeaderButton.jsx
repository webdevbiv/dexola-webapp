import s from "./HeaderButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useBalance } from "wagmi";
import { disconnect } from "@wagmi/core";
import { parseAndRound } from "../../utils/utils";
import { TOKEN_ADDRESS } from "../../constants/constants";

export const HeaderButton = () => {
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
      <button
        className={s.button}
        onClick={() => open()}
      >
        {isConnected ? (
          <div onClick={async () => await disconnect()}>
            {userBalanceOfSepolia
              ? `${formattedWalletAmount} ${userBalanceOfSepolia.symbol}`
              : "Invalid data"}
          </div>
        ) : (
          "connect wallet"
        )}
      </button>
    </>
  );
};
