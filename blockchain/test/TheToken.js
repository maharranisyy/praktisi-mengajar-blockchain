const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("The Token contract", function () {
  /**
   * This Test is used to check if the total supply of tokens is equal to the balance of the owner
   */
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    /**
     * Ethers is a library that allows you to interact with the Ethereum blockchain.
     * A signer in ethers.js is an account that can sign transactions. It's used to deploy contracts, send transactions, etc.
     * A Contract Factory in ethers.js is a class that is used to deploy contracts using a Signer.
     * Deployh function in ethers.js is used to deploy contracts. It returns a Promise that resolves to a Contract. And mean that it will be deployed on the blockchain.
     * A Contract in ethers.js is a class that represents an Ethereum contract. It is used to call the functions of the contract and listen to events.
     * BalanceOf function in ethers.js is used to get the balance of an account. It means that we can check the balance of an account.
     * TotalSupply function in ethers.js is used to get the total supply of tokens. It means that we can check the total supply of tokens.
     */
    const [owner] = await ethers.getSigners(); // Signer is an account that can sign transactions, it means that it can deploy contracts

    const Token = await ethers.getContractFactory("TheToken"); // Get the contract factory, it means that we can deploy the contract

    const hardhatToken = await Token.deploy(); // Deploy the contract, it means it will be deployed on the blockchain

    const ownerBalance = await hardhatToken.balanceOf(owner.address); // Get the balance of the owner, it means that we can check the balance of the owner
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // Check if the total supply is equal to the balance of the owner, it means that we can check if the total supply is equal to the balance of the owner
  });

  /**
   * This test need to using a different account than the owner account
   */
  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners(); // Get the owner account and two other accounts, it means that we can get the owner account and two other accounts

    const TheToken = await ethers.deployContract("TheToken"); // Deploy the contract, it means it will be deployed on the blockchain, and "TheToken" mean is the name of the contract
    expect(await TheToken.balanceOf(owner.address)).to.equal(await TheToken.totalSupply()); // Check if the total supply is equal to the balance of the owner, it means that we can check if the total supply is equal to the balance of the owner
    
    /**
     * Transfer function in ethers.js is used to transfer tokens to another account.
     * Wait function in ethers.js is used to wait for a transaction to be mined.
     */
    await TheToken.transfer(addr1.address, 50); // Transfer 50 tokens from the owner to addr1 account
    expect(await TheToken.balanceOf(addr1.address)).to.equal(50); // Check if the balance of addr1 is equal to 50, it means that we can check if the balance of addr1 is equal to 50

    await TheToken.connect(addr1).transfer(addr2.address, 50); // Transfer 50 tokens from the addr1 to addr2 account
    expect(await TheToken.balanceOf(addr2.address)).to.equal(20); // Check if the balance of addr2 is equal to 50, it means that we can check if the balance of addr2 is equal to 50
  });

});