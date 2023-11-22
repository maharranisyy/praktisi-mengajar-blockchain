const express = require('express');
const Web3 = require('web3');
const contractAbi = require('./SupplyChain.json'); // You need to compile and get ABI

const app = express();
const port = 3000;

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum node

const contractAddress = '0x123...'; // Replace with the actual deployed contract address
const supplyChainContract = new web3.eth.Contract(contractAbi, contractAddress);

app.use(express.json());

app.post('/createProduct', async (req, res) => {
    const { name, description } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await supplyChainContract.methods.createProduct(name, description).send({ from: accounts[0] });
        res.status(200).send('Product created successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating product.');
    }
});

app.post('/shipProduct/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const accounts = await web3.eth.getAccounts();
        await supplyChainContract.methods.shipProduct(productId).send({ from: accounts[0] });
        res.status(200).send(`Product ${productId} shipped successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error shipping product ${productId}.`);
    }
});

app.post('/deliverProduct/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const accounts = await web3.eth.getAccounts();
        await supplyChainContract.methods.deliverProduct(productId).send({ from: accounts[0] });
        res.status(200).send(`Product ${productId} delivered successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error delivering product ${productId}.`);
    }
});

app.get('/getProduct/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const productDetails = await supplyChainContract.methods.getProduct(productId).call();
        res.status(200).json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error retrieving product ${productId} details.`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
