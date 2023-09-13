import PropTypes from "prop-types";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const chains = [sepolia];
const projectId = import.meta.env.VITE_PROJECT_ID;
const apiKey = import.meta.env.VITE_ALCHEMY_KEY;

const { publicClient } = configureChains(chains, [
  alchemyProvider({ apiKey }),
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function Web3ModalConfig({ children }) {
  console.log(`projectId: ${projectId}`);
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}

Web3ModalConfig.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3ModalConfig;
