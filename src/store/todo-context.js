import React, { useEffect, useState, useCallback } from "react";
//import { loadWeb3 } from "../utils/web3";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import TodoApp from "../abis/contracts/TodoApp.json";

const TodoContext = React.createContext({
  account: "",
  filterByDate: "",
  tasks: [],
  methods: {},
  errorMessage: "",
  //loading: false,
  getAll: async () => {},
  updateFilterByDate: async () => {},
});

export const TodoContextProvider = (props) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [contract, setContract] = useState({});
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  //const [loading, setLoading] = useState(false);

  const handleGetAll = useCallback(async () => {
    if (contract.methods) {
      const list = await contract.methods
        .getAllTasks()
        .call({ from: currentAccount });
      setTasks(list);
    }
  }, [contract, currentAccount]);

  const handleUpdateFilterByDate = (date) => {
    setDate(date);
  };

  const loadApp = async (provider) => {
    const web3 = new Web3(provider || "http://localhost:7545");
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }

    try {
      // Get and set user account
      const accounts = await web3.eth.requestAccounts();
      setCurrentAccount(accounts[0]);

      // Get network id
      const networkId = await web3.eth.net.getId();

      // Load TodoApp contract
      const loadedContract = TodoApp.networks[networkId];
      if (loadedContract) {
        // Init smart contract using ABI and address.
        const contractData = new web3.eth.Contract(
          TodoApp.abi,
          loadedContract.address
        );
        setContract(contractData);
        setErrorMessage("");
      } else {
        setErrorMessage("Network not found. Please use local or maybe ropsten Test network.");
      }
    } catch (e) {
      setErrorMessage("Please connect to MetaMask.");
    }
  };

  // Check for eth provider
  const checkForProvider = useCallback(async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      loadApp(provider); // provider === window.ethereum
    } else {
      setErrorMessage("Please install MetaMask!");
    }
  }, []);

  const handleAccountsChanged = useCallback(
    (accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        setCurrentAccount("");
        setErrorMessage("Please connect to MetaMask.");
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        checkForProvider();
        // Do any other work!
      }
    },
    [checkForProvider, currentAccount]
  );

  function handleChainChanged(_chainId) {
    // Reload page
    window.location.reload();
  }

  useEffect(() => {
    checkForProvider();
    if (window.ethereum?.on) {
      //window.ethereum.on("connect", handleChainChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum?.off) {
        window.ethereum.off("chainChanged", handleChainChanged);
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged, checkForProvider]);

  const contextValue = {
    account: currentAccount,
    //loading: loading,
    filterByDate: date,
    errorMessage,
    methods: contract.methods,
    tasks: tasks,
    getAllTasks: handleGetAll,
    updateFilterByDate: handleUpdateFilterByDate,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
