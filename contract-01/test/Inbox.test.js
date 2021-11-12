// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile')
const web3 = new Web3(ganache.provider());

let inbox;
let accounts;
const INITIAL_STRING = 'HI THERE!'
beforeEach(async () => {
    //Getting all easily accessible accounts and use one 
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        //arguments are what the constructor method takes
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });

});
describe('Message Contract ', () => {

    it('Deployes the contract', () => {
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async () => {
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, INITIAL_STRING);
    });
    it('Can Update the mesage', async() => {
        const expectedMessage = 'BYE';
        var newMessage;
        await inbox.methods.setMessage(expectedMessage).send({from:accounts[0]});
        newMessage = await inbox.methods.getMessage().call();
        assert.equal
    });

});