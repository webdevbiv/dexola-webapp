// import { useAccount, useWaitForTransaction } from "wagmi";
// import { MainContainer } from "../MainContainer/MainContainer";
// import { MainForm } from "../MainForm/MainForm";
// import { MainTitle } from "../MainTitle/MainTitle";
// import { useContractRead, useContractWrite } from "../../Hooks";
// import { formatEther } from "viem";

// export const MainClaimRewards = () => {
//   const { address: userWalletAddress } = useAccount();

//   const { data: userRewards } = useContractRead({
//     functionName: "rewards",
//     args: [userWalletAddress],
//     watch: true,
//   });

//   const balanceToDisplay = Number(formatEther(userRewards)).toFixed(2);
//   const {
//     data: claimRewardsData,
//     isLoading: claimRewardsIsLoading,
//     isSuccess: claimRewardsIsSuccess,
//     write: claimRewardsWrite,
//   } = useContractWrite({
//     functionName: "claimReward",
//   });

//   const {
//     data: waitClaimRewards,
//     isError: waitClaimRewardsIsError,
//     isLoading: waitClaimRewardsIsLoading,
//   } = useWaitForTransaction({
//     hash: claimRewardsData?.hash,
//     onSettled(data, error) {
//       console.log("Settled waitClaimRewards", { data, error });
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     claimRewardsWrite();
//   };

//   const isAnyLoading = claimRewardsIsLoading || waitClaimRewardsIsLoading;

//   return (
//     <MainContainer>
//       <MainTitle pageName='Claim rewards' />
//       <MainForm
//         handleSubmit={handleSubmit}
//         isInputDisplayed={false}
//         isAnyLoading={isAnyLoading}
//         balanceToDisplay={balanceToDisplay}
//         buttonText={"Claim rewards"}
//       />
//     </MainContainer>
//   );
// };
