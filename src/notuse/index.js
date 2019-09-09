const Web3 = require("web3");
const fs = require('fs');
const path = require('path');

const web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider("https://kovan.infura.io/v3/37dd526435b74012b996e147cda1c261"));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

const EthereumTx = require('ethereumjs-tx').Transaction;
const Buffer = require('safer-buffer').Buffer;


async function payToken () {
  var fromAddress = '0x6c25FE295Ecee6F0D8D34fC28dca2de68538fA4a'
  var toAddress = '0x4e47581813943E481D1243953b9d951B9B6ef6Ec'
  var abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './abi.json'), 'utf-8'));
  var count = await web3.eth.getTransactionCount(fromAddress);

  var contractAddress = "0x0d01bc6041ac8f72e1e4b831714282f755012764";
  var contract = new web3.eth.Contract(abi, contractAddress, { from: fromAddress });
  var weiTokenAmount = web3.utils.toWei(1+'', 'ether');
 
  var rawTransaction = {
    "from": fromAddress,
    "nonce": "0x" + count.toString(16),
    "gasPrice": "0x003B9ACA00",
    "gasLimit": "0x250CA",//151754
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.transfer(toAddress, weiTokenAmount).encodeABI(),
    "chainId": 0x03
  };

  var privKey = Buffer.from('E1C661DE87DF9B024A63EC2F47B041D76326082FFD7B26CEF6F100F901E232C3', 'hex');
  const tx = new EthereumTx(rawTransaction, { chain: 'kovan' });
  tx.sign(privKey);
  var serializedTx = tx.serialize();
  var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
  return receipt
}

payToken().then((result) => {
  console.log(result)
})