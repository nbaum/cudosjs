import { DirectSecp256k1HdWallet } from "@nikolakterziev/cudosjs";
import { assertIsBroadcastTxSuccess, SigningCosmWasmClient } from "@nikolakterziev/cudosjs";
import * as cfg  from 'dotenv';
  
cfg.config(); 
const mnemonic = process.env.MNEMONIC;
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();
const client = await SigningCosmWasmClient.connectWithSigner(process.env.NODE_URL, wallet);
const amount = {
  denom: "acudos",
  amount: "1234567",
};
const fee = {
    amount: [ {denom: "acudos", amount: "123"}],
    gas: "100000"
}
const result = await client.sendTokens(firstAccount.address, process.env.ADDRESS, [amount], fee, "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);
console.log("You have successfully send cudos!");