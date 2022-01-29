const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

describe('Transactions', function () {
  it('should return an array of transactions', async function () {
    const [owner] = await ethers.getSigners();
    const Transactions = await ethers.getContractFactory('Transactions');
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    expect(Array.isArray(await transactions.getAllTransactions())).to.equal(
      true
    );
    expect(await transactions.getAllTransactions()).to.deep.equal([]);
    await transactions.addToBlockchain(
      '0x11619b30B4eDc77C469DaC7b28ecDe02EfE03A14',
      1,
      'testing',
      'test'
    );
    const transactionList = await transactions.getAllTransactions();
    expect(transactionList.length).to.equal(1);
    expect(await transactions.getTransactionCount()).to.equal(1);
    expect(owner.address).to.equal(transactionList[0].sender);
  });
});
