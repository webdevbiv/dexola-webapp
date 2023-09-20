import { MainContainer } from "../components/MainContainer/MainContainer";
import { MainStake } from "../components/MainStake/MainStake";
import { MainTitle } from "../components/MainTitle/MainTitle";

function Stake() {
  return (
    <MainContainer>
      <MainTitle pageName='Stake' />
      <MainStake />
    </MainContainer>
  );
}

export default Stake;
