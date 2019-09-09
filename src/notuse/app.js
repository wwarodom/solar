
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));


// ======  First use to create account ===
// console.log('Account1 : ',web3.eth.accounts.create())
// console.log('Account2 : ',web3.eth.accounts.create())

const account1 = '0xFa61EA5c6dD5EE3cbE8fb80903a40eb1dEba40C7' // Your account address 1
const account2 = '0x858Ce395cb791Cb2c87c69368b522F30F60bB073' // Your account address 2

const privateKey1 = Buffer.from('b80a9d9f7fc6f17644faca65f4168a96379dfb4c354b9047442798b26ea97e29', 'hex')
const privateKey2 = Buffer.from('2592cd2d408fb1e41263589fccdc2140d9a85e532595c60210d758ea76415369', 'hex')
// const privateKey1 = Buffer.from(process.env.WARODOM.substr(2), 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
   // Build the transaction
   const txObject = {
       nonce:    web3.utils.toHex(txCount),
       to:       account2,
       value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
       gasLimit: web3.utils.toHex(21000),
       gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
   }

   console.log( txObject)
   // Sign the transaction
   const tx = new Tx(txObject, {  hardfork: 'petersburg' })
   tx.sign(privateKey1)

   const serializedTx = tx.serialize()
   const raw = '0x' + serializedTx.toString('hex')
   console.log('raw: ', raw)

   // Broadcast the transaction
   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
       console.log('txHash:', txHash) 
       // Now go check etherscan to see the transaction!
   })
})
