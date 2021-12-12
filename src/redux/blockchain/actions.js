// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../contract-data/actions";
import store from "../store";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { config } = await store.getState().config;
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        let networkId = await ethereum.request({
          method: "net_version",
        });

        if (networkId != config.NETWORK.ID) {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: config.NETWORK.ID_HEX }],
          });

          networkId = await ethereum.request({
            method: "net_version",
          });
        }

        if (networkId == config.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            config.CONTRACT_ADDRESS
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", (chainId) => {
            if (chainId != config.NETWORK.ID) {
              window.location.reload();
            }
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${config.NETWORK.NAME}.`));
        }
      } catch (err) {
        if (err?.message) {
          dispatch(connectFailed(err.message));
        } else {
          dispatch(connectFailed("Something went wrong."));
        }
      }
    } else {
      dispatch(connectFailed("Please, install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
