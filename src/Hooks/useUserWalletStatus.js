import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Hook returns userWalletAddress and userWalletIsConnected from context UserContext
export const useUserWalletStatus = () => {
  const { userWalletAddress, userWalletIsConnected } = useContext(UserContext);
  console.log(
    `useUserWalletStatus: ${userWalletAddress}, ${userWalletIsConnected}`
  );
  return { userWalletAddress, userWalletIsConnected };
};
