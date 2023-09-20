// import s from "./MainWithdraw.module.scss";
// export const MainWithdraw = () => {
//   return (
//     <div className={`mainContainer ${s.container}`}>
//       <div className={s.wrapper}>
//         <div className={s.titleWrapper}>
//           <h2 className={s.title}>Stake</h2>
//           <div>
//             <span className={s.label}>Reward rate:</span>
//             <span className={s.labelValue}></span>
//             <span className={s.labelUnit}>stru/week</span>
//           </div>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className={s.form}
//         >
//           <div className={s.inputWrapper}>
//             <input
//               type='number'
//               placeholder='Enter stake amount'
//               name='amount'
//               value={inputValue}
//               onChange={handleChange}
//               min='1'
//               max='10000'
//               step='1'
//               className={s.input}
//             />
//             <div className={s.balance}>
//               <span className={s.label}>Available:</span>
//               <span className={s.balanceValue}>
//                 {userBalanceOfStarRunner.formatted}
//               </span>
//               <span className={s.balanceUnit}>STRU</span>
//             </div>
//           </div>
//           <div className={s.buttonWrapper}>
//             <button
//               disabled={isAnyLoading}
//               type='submit'
//               className={`${s.button} ${isAnyLoading ? s.buttonDisabled : ""}`}
//             >
//               stake
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
