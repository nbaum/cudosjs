import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, DirectSecp256k1Wallet, AccountData } from '../src/index';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { NftInfo } from '../src/stargate/modules/nft/module'

import Long from "long";

async function  testGravity(){
    const mnemonic1 = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit'
    const mnemonic2 = 'course hurdle stand heart rescue trap upset cousin dish embody business equip'


    const gasPrice = GasPrice.fromString('1acudos');


    const rpc = "http://0.0.0.0:26657/"
    let faucetWallet: DirectSecp256k1HdWallet;
    let faucetAccount: AccountData;
    let faucetAddress: string;
    let faucet: SigningStargateClient;
    let queryClient: StargateClient;
    let signingClient: SigningStargateClient;

    let alice: AccountData;

    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1)
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address;
    faucet = await SigningStargateClient.connectWithSigner(rpc, faucetWallet);
    queryClient = await StargateClient.connect(rpc)
    signingClient = await SigningStargateClient.connectWithSigner(rpc,faucetWallet)

    const signerAlice = await SigningStargateClient.connectWithSigner(rpc,await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2))

    alice =(await (await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2)).getAccounts())[0];

    // Keplr


    async function cancelTrx(){
    // let len = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length
    let id = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].id
    await signingClient.gravityCancelSendToEth(id,faucetAddress,GasPrice.fromString('10000000acudos'))
    }

    async function createTrx(){
      await signingClient.gravitySendToEth(faucetAddress,"0xa677d7229924af63098b9bb70b041a03a1ec7d8c",coinAmount,{denom:"acudos", amount: "1200000000000000000000"},gasPrice)
      console.log("Pending",(await queryClient.gravityModule.getPendingSendToEth(faucetAddress)))
    }


    await createTrx(); 
    await cancelTrx();
  }

  testGravity()
