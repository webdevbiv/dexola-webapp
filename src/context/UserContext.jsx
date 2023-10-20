import PropTypes from "prop-types";
import { createContext } from "react";
import { useAccount } from "wagmi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { address: userWalletAddress, isConnected: userWalletIsConnected } =
    useAccount();

  const userWalletStatus = {
    userWalletAddress,
    userWalletIsConnected,
  };

  return (
    <UserContext.Provider value={userWalletStatus}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
