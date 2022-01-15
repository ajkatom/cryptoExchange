import React, { useContext } from 'react';
import { AiFillPlayCircle, AiOutlineConsoleSql } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import Loader from './Loader';
import { TransactionContext } from '../context/transactionContext';
import { shortenedAddress } from '../utils/shortenedAddress';

const commonStyles =
  'min-h[70px] sm:px-0 p-4 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-small white-glassmorphism"
  />
);

const Home = () => {
  const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(
    TransactionContext
  );
  const abrivatedAddress = shortenedAddress(currentAccount);
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Transfer crypto <br /> where ever you want
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Send crypto on katomscrypto
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justfiy-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="w-full text-white text-base font-semibold">connect wallet</p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`rounded-tr-2xl md:rounded-none ${commonStyles}`}>Security</div>
            <div className={`md:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`md:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={`rounded-bl-2xl md:rounded-none ${commonStyles}`}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-between items-start flex-col rounds-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex jsutify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-gray flex justify-center items-center">
                  <SiEthereum fontSize={21} color="gray" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
            </div>
            <div>
              {currentAccount ? (
                <p className="text-black font-light text-[11px]">{abrivatedAddress}</p>
              ) : (
                <p className="text-black font-light text-[11px]">Address</p>
              )}
              <p className="text-white font-semibold text-lg mt-1 ">Ethereum</p>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (GIF)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {false ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
