import { useBalance } from "wagmi";
import { TOKEN } from "../constants/constants";
import { roundToDecimalPlaces } from "../utils/utils";

export const useUserBalanceOfStarRunner = ({
  userWalletAddress,
  formatted = false,
}) => {
  const { data: userBalanceOfStarRunner, isLoading } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
    watch: true,
  });

  if (!isLoading && userBalanceOfStarRunner) {
    return formatted
      ? Math.floor(roundToDecimalPlaces(userBalanceOfStarRunner?.formatted, 2))
      : userBalanceOfStarRunner.formatted;
  }

  return null;
};
