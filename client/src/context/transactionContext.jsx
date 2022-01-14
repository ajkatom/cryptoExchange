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
  const [isLoaing, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
