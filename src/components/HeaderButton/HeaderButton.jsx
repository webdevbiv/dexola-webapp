import s from "./HeaderButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useBalance } from "wagmi";
import { disconnect } from "@wagmi/core";
import { parseAndRound } from "../../utils/utils";

export const HeaderButton = () => {
  // Open Web3Modal
  const { open } = useWeb3Modal();

  //Wagmi data
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const formattedWalletAmount = parseAndRound(data?.formatted, 2);

  return (
    <>
      <button
        className={s.button}
        onClick={() => open()}
      >
        {isConnected ? (
          <div onClick={async () => await disconnect()}>
            {data ? `${formattedWalletAmount} ${data.symbol}` : "Invalid data"}
          </div>
        ) : (
          "connect wallet"
        )}
      </button>
    </>
  );
};
