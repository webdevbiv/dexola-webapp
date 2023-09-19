import { useBalance } from "wagmi";
import { TOKEN } from "../constants/constants"; // Update the path accordingly

const useUserBalanceOfStarRunner = (userWalletAddress) => {
  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
    watch: true,
  });

  return userBalanceOfStarRunner;
};

export default useUserBalanceOfStarRunner;
