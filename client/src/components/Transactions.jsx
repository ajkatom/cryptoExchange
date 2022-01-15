import React, { useContext } from 'react';
import { TransactionContext } from '../context/transactionContext';
import { shortenedAddress } from '../utils/shortenedAddress';
import dummyTransactions from '../utils/dummyTransactions';

const TransactionCard = ({ addressTo, addressFrom, timeStamp, message, keyword, amount, url }) => {
  const abrivatedAddressTo = shortenedAddress(addressTo);
  const abrivatedAddressFrom = shortenedAddress(addressFrom);
  return (
    <div className="text-white text-sm flex flex-row justify-start items-start">
      <ul>
        <h3>{`To:${abrivatedAddressTo}`}</h3>
        <h3>{`From:${abrivatedAddressFrom} `}</h3>
        <h3>{`When:${timeStamp}`}</h3>
        <h3>{`Msg:${message}`}</h3>
        <h3>{`Keyword:${keyword}`}</h3>
        <h3>{`Amount:${amount}`}</h3>
        <h3>{`URL:${url}`}</h3>
      </ul>
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
          {/* {dummyTransactions.reverse().map((transaction, idx) => ( */}
          <TransactionCard key={dummyTransactions[0].id} {...dummyTransactions[0]} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
