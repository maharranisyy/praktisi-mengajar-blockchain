// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9; //It will be used by the solidity to know which version of the compiler to use

//This is the main building block for smart contracts.
contract TheToken {
  //Some string type variables to identify the token
  string public name = "The Contract Token";
  string public symbol = "TCT";

  // A variable to keep track of all balances, the fixed keyword is used to make sure that the totalSupply is not changed, stored in unsigned integer of 256 bits
  uint256 public totalSupply = 1000000;

  // A mapping is essentially a hash table data structure. And is used to store Ethereum accounts
  address public owner;

  //A mapping is a key-value store for storing and looking up data
  mapping(address => uint256) balances;

  // This is the Transfer event that will be emitted each time a transfer occurs. It helps off-chain applications to know when the state within your contract changes.
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  /**
    * Constructor function - Contract Initialization
    * The "public" keyword makes variables accessible from other contracts
    * The "msg.sender" is a global variable that is available in all functions and will return the account sending the transaction.
    * The "memory" keyword is used to hold temporary values.
    */
  constructor() {
    // The totalSupply is assigned to transaction sender, which is the account that is deploying the contract
    owner = msg.sender;
    balances[owner] = totalSupply;
  }

  /**
   * A function to Transfer tokens
   * The `external` modifier makes the function only callable from outside the contract.
   * @dev Gets the balance of the specified address.
   * @dev Transfer token for a specified address
   * @param to The address to transfer to.
   * @param amount The amount to be transferred.
   */
  function transfer(address to, uint256 amount) external{
    // Check if the sender has enough, if the require statement evaluates to false, the execution terminates and reverts all changes to the state and Ether balances.
    require(balances[msg.sender] >= amount, "Not enough tokens");

    // Check for overflows, this is need to prevent an integer overflow attack where the recipient balance could be manipulated to any value by an attacker.
    require(balances[to] + amount >= balances[to], "Overflow error");

    // Subtract from the sender, it means that the sender will lose the amount of tokens that are being transferred.
    balances[msg.sender] -= amount;

    // Add the same to the recipient, this mean that the recipient will gain the amount of tokens that are being transferred.
    balances[to] += amount;

    // Emit the Transfer event and notify off-chain applications of the transfer
    emit Transfer(msg.sender, to, amount);
  }
  
  /**
   * A function to get the token balance of an account.
   * The `external` modifier makes the function only callable from outside the contract.
   * @param account The address of the token holder.
   * @return An uint256 representing the amount owned by the passed address.
   * This is read-only function, which means that it does not modify the state of the contract.
   * The keyword `view` is used to indicate that it won't modify the state.
   */
  function balanceOf(address account) external view returns (uint256){
    // The balance of an account is simply the value of the `balances` mapping for that account:
    return balances[account];
  }
}