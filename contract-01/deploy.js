// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
//ADD the 12 words Mnemonic below
var MNEMIONIC = ""
var INFURA_DEPLOY_LINK = "";

const provider = new HDWalletProvider(MNEMIONIC, INFURA_DEPLOY_LINK);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from accont : ' + accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There mate'] })
        .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract is available on : ' + result.options.address)
};
deploy();