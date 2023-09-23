import { useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import {
  useUserBalanceOfStarRunner,
  useRewardRateForUser,
  useContractWrite,
  useContractRead,
} from "../../Hooks";

import { CONTRACT } from "../../constants/constants";
import { MainTitle } from "../MainTitle/MainTitle";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { sanitizeInputValue } from "../../utils/utils";

export const MainStake = () => {
  const [inputValue, setInputValue] = useState("");
  const { address: userWalletAddress } = useAccount();
  const balanceToDisplay = Number(
    useUserBalanceOfStarRunner(userWalletAddress).formatted
  ).toFixed(1);

  const amountToApprove = parseEther(inputValue.toString());

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
  });

  const rewardRate = useRewardRateForUser(
    inputValue,
    userStakedBalanceOfStarRunner
  );

  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
  } = useContractWrite({
    functionName: "approve",
    token: true,
  });

  const {
    data: waitForApprove,
    isError: waitForApproveIsError,
    isLoading: waitForApproveIsLoading,
  } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForApprove", { data, error });
      stakeWrite({ args: [amountToApprove] });
    },
  });

  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    write: stakeWrite,
  } = useContractWrite({ functionName: "stake" });

  const {
    data: waitForStake,
    isError: waitForStakeIsError,
    isLoading: waitForStakeIsLoading,
  } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForStake", { data, error });
      setInputValue("");
    },
  });

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    approveWrite({
      args: [CONTRACT, amountToApprove],
    });
  };

  const isAnyLoading =
    approveIsLoading ||
    stakeIsLoading ||
    waitForApproveIsLoading ||
    waitForStakeIsLoading;

  return (
    <MainContainer>
      <MainTitle
        pageName='Stake'
        rewardRate={rewardRate}
      />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={balanceToDisplay}
        buttonText={"Stake"}
      />
    </MainContainer>
  );
};

// import { useState } from "react";
// import { useAccount } from "wagmi";
// import { parseEther } from "viem";

// // Hooks
// import {
//   useUserBalanceOfStarRunner,
//   useRewardRateForUser,
//   useApproveAndStake,
// } from "../../Hooks";
// import { sanitizeInputValue } from "../../utils/utils";

// // Components
// import { MainTitle } from "../MainTitle/MainTitle";
// import { MainContainer } from "../MainContainer/MainContainer";
// import { MainForm } from "../MainForm/MainForm";

// // Constants
// import { CONTRACT } from "../../constants/constants";

// export const MainStake = () => {
//   const [inputValue, setInputValue] = useState("");
//   const { address: userWalletAddress } = useAccount();
//   const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);
//   const rewardRate = useRewardRateForUser(inputValue);
//   const amountApprove = parseEther(inputValue.toString());

//   const { approveWrite, approveIsLoading, stakeIsLoading } =
//     useApproveAndStake(amountApprove);

//   const handleChange = (e) => {
//     const sanitizedValue = sanitizeInputValue(e.target.value);
//     setInputValue(sanitizedValue);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     approveWrite({
//       args: [CONTRACT, amountApprove],
//     });
//     setInputValue("");
//   };

//   const isAnyLoading = approveIsLoading || stakeIsLoading;

//   return (
//     <MainContainer>
//       <MainTitle
//         pageName='Stake'
//         rewardRate={rewardRate}
//       />
//       <MainForm
//         handleSubmit={handleSubmit}
//         handleChange={handleChange}
//         inputValue={inputValue}
//         isAnyLoading={isAnyLoading}
//         balanceOfStarRunner={userBalanceOfStarRunner}
//       />
//     </MainContainer>
//   );
// };
