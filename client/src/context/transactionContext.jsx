import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return TransactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const transactionContract = getEthereumContract();
      const transactionList = await transactionContract.getAllTransactions();
      const formatedTransactionList = transactionList.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
        keyword: transaction.keyword,
        message: transaction.massage,
      }));
      setTransactions(formatedTransactionList);
    } catch (error) {
      console.error(error);
    }
  };
  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('no etherum object found');
    }
  };
  const checkIfTransactionsExit = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount;
      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.error(error);
      throw new Error('no etherum object found');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('no etherum object found');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const hexAmount = ethers.utils.parseEther(amount);

      const transactionParams = {
        gas: '0x5208',
        from: currentAccount,
        to: addressTo,
        value: hexAmount._hex,
      };

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParams],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        hexAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`loaded: ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount;

      setTransactionCount(Number(transactionCount));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkWalletConnection();
    checkIfTransactionsExit();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
