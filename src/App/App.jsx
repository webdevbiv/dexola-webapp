import Web3ModalConfig from "../Web3Modal/Web3ModalConfig";
import { UserProvider } from "../context/UserContext";
import { AppRoutes } from "../routes";

function App() {
  return (
    <Web3ModalConfig>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Web3ModalConfig>
  );
}

export default App;
