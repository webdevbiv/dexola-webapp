import Web3ModalConfig from "../Web3Modal/Web3ModalConfig";
import { AppRoutes } from "../routes";

function App() {
  return (
    <Web3ModalConfig>
      <AppRoutes />
    </Web3ModalConfig>
  );
}

export default App;
