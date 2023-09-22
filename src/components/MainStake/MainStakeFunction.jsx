// import { useState } from "react";
// import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
// import { parseEther } from "viem";
// import useUserBalanceOfStarRunner from "../../Hooks/useUserBalanceOfStarRunner";
// import s from "./MainStake.module.scss";
// import { useRewardRateForUser } from "../../Hooks/useRewardRateForUser";
// import { useContractRead } from "../../Hooks/useContractRead";

// import {
//   CONTRACT,
//   CONTRACT_ABI,
//   TOKEN,
//   TOKEN_ABI,
// } from "../../constants/constants";
// import dataC from "../../data/contractABI.json";
// import dataT from "../../data/tokenABI.json";

// console.log(dataC, dataT);

// export const MainStake = () => {
//   const [inputValue, setInputValue] = useState("");
//   const { address: userWalletAddress } = useAccount();
//   const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);
//   const rewardRate = useRewardRateForUser(inputValue);
//   const amountApprove = parseEther(inputValue.toString());
//   const { data: allowance } = useContractRead({
//     functionName: "allowance",
//     token: true,
//     watch: true,
//     args: [userWalletAddress, CONTRACT],
//   });
//   console.log(allowance);

//   const handleChange = (e) => {
//     let value = e.target.value;
//     if (value.charAt(0) === "-") {
//       value = value.substring(1);
//     }
//     if (value < 0) value = 0;
//     if (value > 10000) value = 10000;

//     setInputValue(value);
//   };

//   const {
//     data: approveData,
//     isLoading: approveIsLoading,
//     isSuccess: approveIsSuccess,
//     write: approveWrite,
//   } = useContractWrite({
//     address: TOKEN,
//     abi: TOKEN_ABI,
//     functionName: "approve",
//     args: [CONTRACT, amountApprove],
//   });

//   const {
//     data: waitForApprove,
//     isError: waitForApproveIsError,
//     isLoading: waitForApproveIsLoading,
//   } = useWaitForTransaction({
//     hash: approveData?.hash,
//     onSettled(data, error) {
//       console.log("Settled waitForApprove", { data, error });
//       stakeWrite();
//     },
//   });

//   const {
//     data: stakeData,
//     isLoading: stakeIsLoading,
//     isSuccess: stakeIsSuccess,
//     writeAsync: stakeWrite,
//   } = useContractWrite({
//     address: CONTRACT,
//     abi: CONTRACT_ABI,
//     functionName: "stake",
//     args: [amountApprove],
//   });

//   const {
//     data: waitForStake,
//     isError: waitForStakeIsError,
//     isLoading: waitForStakeIsLoading,
//   } = useWaitForTransaction({
//     hash: stakeData?.hash,
//     onSettled(data, error) {
//       console.log("Settled waitForStake", { data, error });
//     },
//   });

//   const isAnyLoading =
//     approveIsLoading ||
//     stakeIsLoading ||
//     waitForApproveIsLoading ||
//     waitForStakeIsLoading;

//   return (
//     <div className={`mainContainer ${s.container}`}>
//       <div className={s.wrapper}>
//         <div>
//           <div>
//             <h2>stake</h2>
//             <div>
//               <span>Reward rate:</span>
//               <span>{rewardRate}</span>
//               <span>stru/week</span>
//             </div>
//           </div>
//           <div>
//             <input
//               type='number'
//               placeholder='Enter stake amount'
//               name='amount'
//               value={inputValue}
//               onChange={handleChange}
//               min='1'
//               max='10000'
//               step='1'
//             />
//             <div>
//               <span>Available:</span>
//               <span>{userBalanceOfStarRunner.formatted}</span>
//               <span>STRU</span>
//             </div>
//           </div>
//           <button
//             type='button'
//             onClick={() => approveWrite()}
//             disabled={isAnyLoading}
//           >
//             stake
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
