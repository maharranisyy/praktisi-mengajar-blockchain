// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address public owner;
    uint256 public productId;
    enum State { Created, Shipped, Delivered }

    struct Product {
        string name;
        string description;
        State state;
    }

    mapping(uint256 => Product) public products;

    event ProductCreated(uint256 productId, string name, string description);
    event ProductShipped(uint256 productId);
    event ProductDelivered(uint256 productId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier productExists(uint256 _productId) {
        require(products[_productId].state != State.Created, "Product does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createProduct(string memory _name, string memory _description) external onlyOwner {
        productId++;
        products[productId] = Product(_name, _description, State.Created);
        emit ProductCreated(productId, _name, _description);
    }

    function shipProduct(uint256 _productId) external onlyOwner productExists(_productId) {
        products[_productId].state = State.Shipped;
        emit ProductShipped(_productId);
    }

    function deliverProduct(uint256 _productId) external onlyOwner productExists(_productId) {
        products[_productId].state = State.Delivered;
        emit ProductDelivered(_productId);
    }
}
