import PropTypes from "prop-types";
import s from "./ButtonConnectWallet.module.scss";
import { useWeb3Modal } from "@web3modal/react";
const ButtonConnectWallet = ({ location = "header" }) => {
  // Open Web3Modal
  const { open } = useWeb3Modal();
  return (
    <button
      className={location === "header" ? s.header : s.main}
      onClick={() => open()}
    >
      connect wallet
    </button>
  );
};

ButtonConnectWallet.propTypes = {
  location: PropTypes.string.isRequired,
};

export default ButtonConnectWallet;
