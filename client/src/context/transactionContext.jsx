import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getigner();
  const TransactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({
    provider,
    signer,
    TransactionContract,
  });
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkWalletConnection = async () => {
    try {
      if (!ethereum) return alert('metamask not installed please install to contiue');
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        alert('No accounts found');
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

  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet }}>{children}</TransactionContext.Provider>
  );
};
