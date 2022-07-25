import { DirectSecp256k1HdWallet, SigningStargateClient, StargateClient, GasPrice, DirectSecp256k1Wallet, AccountData } from '../src/index';

import Long from "long";

describe("Gravity module",() => {
    // Generated from local debug-node
    const mnemonic1 = 'have shell collect fire erosion grid dry polar upset crumble charge post wrap tilt rebel inner harbor wolf sheriff frost inner suffer innocent extra'
    const mnemonic2 = 'spell better witness clean salt clown open glance tree north replace bicycle erupt afford high brush tail present transfer melody lend nerve search split'

    const gasPrice = GasPrice.fromString('1acudos')


    const rpc = "http://0.0.0.0:26657/"
    let faucetWallet: DirectSecp256k1HdWallet;
    let faucetAccount: AccountData;
    let faucetAddress: string;
    let faucet: SigningStargateClient;
    let queryClient: StargateClient;
    let signingClient: SigningStargateClient;

    let aliceAccount: AccountData;
    let aliceWallet: DirectSecp256k1HdWallet;
    let aliceSigningClient: SigningStargateClient

    jest.setTimeout(500000);

    beforeAll( async () => {
    faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic1)
    faucetAccount = (await faucetWallet.getAccounts())[0];
    faucetAddress = faucetAccount.address; 
    queryClient = await StargateClient.connect(rpc)
    signingClient = await SigningStargateClient.connectWithSigner(rpc,faucetWallet)

    aliceWallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic2)
    aliceAccount =(await aliceWallet.getAccounts())[0];
    aliceSigningClient = await SigningStargateClient.connectWithSigner(rpc,aliceWallet)
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

    test("Cancel send to ETH - happy path", async () =>{
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].id
        await expect (signingClient.gravityCancelSendToEth(id,faucetAddress,gasPrice)).resolves.not.toThrowError()
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBe(0)
    })

    test("send  Cosmos --> ETH - 2nd transaction - success", async () =>{
        const coinAmount = {denom:"acudos", amount: "1000"}
        const feeAmount = {denom:"acudos", amount: "10000"}
        const erc20Contract =  '0x28ea52f3ee46cac5a72f72e8b3a387c0291d586d'
        await expect (signingClient.gravitySendToEth(faucetAddress,"0xa677d7229924af63098b9bb70b041a03a1ec7d8c",coinAmount,feeAmount,gasPrice))
        .resolves.not.toThrowError();
        return expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].erc20Token).toEqual({amount:coinAmount.amount,contract:erc20Contract})
    })

    test("Cancel send to ETH - fail - wrong Sender", async () =>{
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].id
        const notSenderSigningClient = aliceSigningClient
        await expect (notSenderSigningClient.gravityCancelSendToEth(id,aliceAccount.address,gasPrice)).rejects.toThrowError(`Sender ${aliceAccount.address} did not send Id ${id}`)
    })

    test("Cancel send to ETH - fail - wrong Id", async () =>{
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBeGreaterThan(0)
        let wrongId = new Long(0,10,true)
        await expect (signingClient.gravityCancelSendToEth(wrongId,faucetAddress,gasPrice)).rejects.toThrowError(`unknown transaction with id ${wrongId} from sender ${faucetAddress}`)
    })

    test("Cancel send to ETH - fail - invalid cosmos address", async () =>{
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].id
        await expect (signingClient.gravityCancelSendToEth(id,"wrong address",gasPrice)).rejects.toThrowError("Invalid address.")
    })

    test("Cancel send to ETH - 2nd transaction - success", async () =>{
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBeGreaterThan(0)
        let id = (await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers[0].id
        await expect (signingClient.gravityCancelSendToEth(id,faucetAddress,gasPrice)).resolves.not.toThrowError()
        expect ((await queryClient.gravityModule.getPendingSendToEth(faucetAddress)).unbatchedTransfers.length)
        .toBe(0)
    })

})