import s from "./HeaderButton.module.scss";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useBalance } from "wagmi";
import { disconnect } from "@wagmi/core";
export const HeaderButton = () => {
  // Open Web3Modal
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  console.log(data);

  return (
    <>
      {isConnected ? (
        <div onClick={async () => await disconnect()}>
          {typeof data.formatted === "string"
            ? parseFloat(data.formatted).toFixed(1)
            : "Invalid data"}
        </div>
      ) : (
        <button
          className={s.button}
          onClick={() => open()}
        >
          {"connect wallet"}
        </button>
      )}
    </>
  );
};
