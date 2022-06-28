import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient, GasPrice, DeliverTxResponse } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GroupModule } from "./modules/group/module";
import { NftModule } from "./modules/nft/module";
import { MsgIssueDenomResponse } from "./modules/nft/proto-types/tx";
import { checkValidNftDenomId, checkValidAddress } from "../utils/checks";

export class CudosSigningStargateClient extends SigningStargateClient {
    public readonly groupModule: GroupModule;
    public readonly nftModule: NftModule;

    public static override async connectWithSigner(
        endpoint: string | HttpEndpoint,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CudosSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningStargateClient(tmClient, signer, options);
    }

    protected constructor(
        tmClient: Tendermint34Client,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options);
        this.groupModule = new GroupModule(this);
        this.nftModule = new NftModule(this);
    }

    //easy to use with estimated fee
    public async nftIssueDenom(
        sender: string, 
        id: string, 
        name: string, 
        schema: string,
        symbol: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidNftDenomId(id);
        checkValidAddress(sender);

        if (name.length === 0){
            throw Error("Name must be at lease one symbol");
        }

        if (schema.length === 0){
            throw Error("Invalid schema");
        }

        if (symbol.length === 0){
            throw Error("Symbol must be at lease one symbol");
        }

        const {msg, fee} = await this.nftModule.msgIssueDenom(id, name, schema, sender, '', symbol, gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async nftTransfer(
        sender: string, 
        denomId: string, 
        tokenId: string, 
        from: string,
        to: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidNftDenomId(denomId);
        checkValidAddress(sender);
        checkValidAddress(from);
        checkValidAddress(to);

        if (tokenId.length === 0){
            throw Error("Name must be at lease one symbol");
        }

        const {msg, fee} = await this.nftModule.msgTransferNft(denomId, tokenId, from, to, sender, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }


    //easy to use with estimated fee
    public async nftApprove(
        sender: string, 
        denomId: string, 
        tokenId: string, 
        approvedAddress: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidNftDenomId(denomId);
        checkValidAddress(sender);
        checkValidAddress(approvedAddress);

        if (tokenId.length === 0){
            throw Error("Name must be at lease one symbol");
        }

        const {msg, fee} = await this.nftModule.msgApproveNft(tokenId, denomId, sender, approvedAddress, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async nftApproveAll(
        sender: string, 
        operator: string,
        approved: boolean,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidAddress(sender);
        checkValidAddress(operator);

        const {msg, fee} = await this.nftModule.msgApproveAllNft(operator, sender, approved, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }


    //easy to use with estimated fee
    public async nftEditToken(
        sender: string,
        denomId: string,
        tokenId: string,
        name: string,
        uri: string,
        data: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidAddress(sender);
        checkValidNftDenomId(denomId);

        if (tokenId.length === 0) {
            throw Error("Token Id must be at lease one symbol");
        }

        if (name.length === 0) {
            throw Error("Name must be at lease one symbol");
        }

        if (uri.length === 0) {
            throw Error("Uri must be at lease one symbol");
        }

        if (data.length === 0) {
            throw Error("Data must be at lease one symbol");
        }


        const {msg, fee} = await this.nftModule.msgEditNFT(tokenId, denomId, name, uri, data, sender, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

    //easy to use with estimated fee
    public async nftMintToken(
        sender: string,
        denomId: string,
        name: string,
        uri: string,
        data: string,
        recipient: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidAddress(sender);
        checkValidAddress(recipient);
        checkValidNftDenomId(denomId);

        if (name.length === 0) {
            throw Error("Name must be at lease one symbol");
        }

        if (uri.length === 0) {
            throw Error("Uri must be at lease one symbol");
        }

        if (data.length === 0) {
            throw Error("Data must be at lease one symbol");
        }

        const {msg, fee} = await this.nftModule.msgMintNFT(denomId, name, uri, data, sender, recipient, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }

     //easy to use with estimated fee
     public async nftBurnToken(
        sender: string,
        denomId: string,
        tokenId: string,
        gasPrice: GasPrice,
        memo?: string,
        gasMultiplier?: number,
    ): Promise<DeliverTxResponse> {
        checkValidAddress(sender);
        checkValidNftDenomId(denomId);

        if (tokenId.length === 0) {
            throw Error("Token Id must be at lease one symbol");
        }

        const {msg, fee} = await this.nftModule.msgBurnNFT(tokenId, denomId, sender, '', gasPrice, gasMultiplier, memo);
        return this.signAndBroadcast(sender, [msg], fee, memo);
    }
}