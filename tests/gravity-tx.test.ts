import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, DirectSecp256k1Wallet, AccountData } from '../src/index';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { NftInfo } from '../src/stargate/modules/nft/module'

import Long from "long";

describe("Gravity module",() => {
    const mnemonic1 = 'ordinary witness such toddler tag mouse helmet perfect venue eyebrow upgrade rabbit'
    const mnemonic2 = 'course hurdle stand heart rescue trap upset cousin dish embody business equip'

    const gasPrice = GasPrice.fromString('1acudos')


    const rpc = "http://localhost:26657"
    let faucetWallet: DirectSecp256k1HdWallet;
    let faucetAccount: AccountData;
    let faucetAddress: string;
    let faucet: SigningStargateClient;
    let queryClient: StargateClient;
    let signingClient: SigningStargateClient;

    let alice: AccountData;

    jest.setTimeout(20000);

    beforeAll( async () => {
    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1)
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address; // cudos1yvtuaadhfhxf8ke7zm902z4rj382a8ayymq32s
    faucet = await SigningStargateClient.connectWithSigner(rpc, faucetWallet);
    queryClient = await StargateClient.connect(rpc)
    signingClient = await SigningStargateClient.connectWithSigner(rpc,faucetWallet)

    alice =(await (await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2)).getAccounts())[0];
    })

    test("send  Cosmos --> ETH - happy path ", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        const erc20Contract =  '0x28ea52f3ee46cac5a72f72e8b3a387c0291d586d'
        await expect (signingClient.gravitySendToEth(faucetAddress,"0xa677d7229924af63098b9bb70b041a03a1ec7d8c",coinAmount,feeAmount,gasPrice))
        .resolves.not.toThrowError();
        return expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].erc20Token).toEqual({amount:coinAmount.amount,contract:erc20Contract})
    })

    test("send  Cosmos --> ETH - fail invalid cosmos address ", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        await expect (signingClient.gravitySendToEth("Invalid Address","0xa677d7229924af63098b9bb70b041a03a1ec7d8c",coinAmount,feeAmount,gasPrice))
        .rejects.toThrowError("Invalid address.");
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Empty", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        await expect (signingClient.gravitySendToEth(faucetAddress,"",coinAmount,feeAmount,gasPrice))
        .rejects.toThrowError("Empty ETH Address");
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Wrong lenght", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        const wrongEthAddr = "0x28ea52f3ee46cac5a72f72e8b3a387c0291d586"
        await expect (signingClient.gravitySendToEth(faucetAddress,wrongEthAddr,coinAmount,feeAmount,gasPrice))
        .rejects.toThrowError(`address(${wrongEthAddr}) of the wrong length exp(42) actual(${wrongEthAddr.length})`);
    })

    test("send  Cosmos --> ETH - fail invalid ETH address - Invalid ETH address", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        const wrongEthAddr = "28ea52f3ee46cac5a72f72e8b3a387c0291d586cGm" // NO 0x but right lenght
        await expect (signingClient.gravitySendToEth(faucetAddress,wrongEthAddr,coinAmount,feeAmount,gasPrice))
        .rejects.toThrowError(`Invalid ETH Address`);
    })

    test("send  Cosmos --> ETH - fail 0 coin amount", async () =>{
        const coinAmount = {denom:"acudos", amount: "0"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        const wrongEthAddr = "0xa677d7229924af63098b9bb70b041a03a1ec7d8c" 
        await expect (signingClient.gravitySendToEth(faucetAddress,wrongEthAddr,coinAmount,feeAmount,gasPrice))
        .rejects.toThrowError("Minimum amount to send is 1");
    })
}
)