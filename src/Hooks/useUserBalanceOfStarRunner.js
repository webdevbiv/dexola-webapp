import { useBalance } from "wagmi";
import { TOKEN } from "../constants/constants";
import { roundToDecimalPlaces } from "../utils/utils";

export const useUserBalanceOfStarRunner = ({
  userWalletAddress,
  formatted = false,
}) => {
  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
    watch: true,
  });

  const formattedBalanceOfStarRunner = Math.floor(
    roundToDecimalPlaces(userBalanceOfStarRunner?.formatted, 2)
  );

  return formatted
    ? formattedBalanceOfStarRunner
    : userBalanceOfStarRunner.formatted;
};
