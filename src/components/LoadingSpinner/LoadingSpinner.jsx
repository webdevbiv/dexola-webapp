import { ThreeCircles } from "react-loader-spinner";
import { MainContainer } from "../MainContainer/MainContainer";
import s from "./LoadingSpinner.module.scss";

export const LoadingSpinner = () => {
  return (
    <MainContainer>
      <div className={s.wrapper}>
        <ThreeCircles
          visible={true}
          ariaLabel='three-circles-rotating'
        />
      </div>
    </MainContainer>
  );
};
