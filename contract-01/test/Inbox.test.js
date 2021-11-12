// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')
const web3 = new Web3(ganache.provider());

let inbox;
let accounts;

beforeEach(async () => {
    //Getting all easily accessible accounts and use one 
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    //arguments are what the constructor method takes
    .deploy({ data: bytecode, arguments: ['Hi There!'] })
    .send({ from: accounts[0], gas: '1000000' });

});
describe('First contract tests ', () => {

    it('Deployes the contract', () => {
        console.log(inbox)
    });
});