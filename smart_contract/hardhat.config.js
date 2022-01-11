require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
console.log(process.env.URL);
module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: process.env.URL,
      accounts: [process.env.ACCOUNTS],
    },
  },
};
