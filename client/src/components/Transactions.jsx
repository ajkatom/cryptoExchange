import React, { useContext } from 'react';
import { TransactionContext } from '../context/transactionContext';
import { shortenedAddress } from '../utils/shortenedAddress';
import dummyTransactions from '../utils/dummyTransactions';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const abrivatedAddressTo = shortenedAddress(addressTo);
  const abrivatedAddressFrom = shortenedAddress(addressFrom);
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1 
      2xl:min-w-[450px] 
      2xl:max-w-[500px]
      sm:min-w-[270px] 
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl
      "
    >
      <div className="flex flex-col items-center w-fullmt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.ethereum.io/address/${addressFrom}`}
            traget="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From:
              <span className="text-[#87CEEB] text-decoration-line: underline text-base">
                {abrivatedAddressFrom}
              </span>
            </p>
          </a>
          <a
            href={`https://ropsten.ethereum.io/address/${addressTo}`}
            traget="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To:
              <span className="text-[#87CEEB] text-decoration-line: underline text-base">
                {abrivatedAddressTo}
              </span>
            </p>
          </a>
          <p className="text-white text-base ">Amount: {amount}</p>
          {message && (
            <>
              <br />
              <p className="text-white text-bese">Message: {message}</p>
            </>
          )}
          <div className="bg-zinc-700 pp-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">Transactions List</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            please connect account to see TransactionContext
          </h3>
        )}
        <div className="flex flex-wrap justify-center -items-center mt-10">
          {dummyTransactions.reverse().map((transaction, idx) => (
            <TransactionCard key={idx} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
