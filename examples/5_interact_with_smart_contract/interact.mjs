import { SigningCosmWasmClient, DirectSecp256k1HdWallet } from 'cudosjs'
  
import * as fs from 'fs'
import * as cfg from 'dotenv'

  // Load environment variables
  cfg.config();
  
  const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "acudos" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "acudos" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "acudos" }],
        gas: "500000",
    },
    send: {
        amount: [{ amount: "80000", denom: "acudos" }],
        gas: "80000",
    },
  }
  

const mnemonic = process.env.MNEMONIC;
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();
const client = await SigningCosmWasmClient.connectWithSigner(process.env.NODE_URL, wallet);

console.log(`Connected to wallet with address=${firstAccount.address}`)

// Upload the wasm of a simple contract
const wasm = fs.readFileSync("5_interact_with_smart_contract/cw_escrow.wasm");
console.log('Uploading contract')
const uploadReceipt = await client.upload(firstAccount.address, wasm, customFees.upload);
console.log('uploadReceipt :', uploadReceipt);
// Get the code ID from the receipt
const codeId = uploadReceipt.codeId;
console.log('codeId: ', codeId);

// Create an instance of the Counter contract, providing a starting count
const initMsg = { "arbiter": firstAccount.address,  "recipient": process.env.ADDRESS }
  
const funds = [{ amount: "5000", denom: "acudos" }]
const contract = await client.instantiate(firstAccount.address, codeId, initMsg, "Sample escrow " + Math.ceil(Math.random()*10000), customFees.init, { funds });
console.log('contract: ', contract);

const contractAddress = contract.contractAddress;

console.log('Querying for balance');
let contractBalance = await client.getBalance(contractAddress, 'acudos');
let receiverBalance = await client.getBalance(process.env.ADDRESS, 'acudos');

console.log(`Contract Balance: ${JSON.stringify(contractBalance)}`)
console.log(`Receiver Balance: ${JSON.stringify(receiverBalance)}`)


// Approve the escrow
const handleMsg = { "approve":{"quantity":[{"amount":"5000","denom":"acudos"}]}};
console.log('Approving escrow');
const response = await client.execute(firstAccount.address, contractAddress, handleMsg, customFees.exec);
console.log('response: ', response);

// Query again to confirm it worked
console.log('Querying again contract for the updated balance');
contractBalance = await client.getBalance(contractAddress, 'acudos');
receiverBalance = await client.getBalance(process.env.ADDRESS, 'acudos');

console.log(`Contract Balance: ${JSON.stringify(contractBalance)}`)
console.log(`Receiver Balance: ${JSON.stringify(receiverBalance)}`)
