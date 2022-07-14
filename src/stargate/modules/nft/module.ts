import { EncodeObject } from "@cosmjs/proto-signing";
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry } from "../../../utils";
import { GasPrice, StdFee } from "../../..";
import { msgIssueDenom, msgTransferNft, msgApproveNft, msgApproveAllNft, msgRevokeNft, msgEditNFT, msgMintNFT, msgBurnNFT } from "./types";
import { checkValidNftDenomId, checkValidAddress } from "../../../utils/checks";

export class NftInfo {
    denomId: string;
    name: string;
    uri: string;
    data: string;
    recipient: string;

    constructor(
        denomId: string,
        name: string,
        uri: string,
        data: string,
        recipient: string
    ) {
        this.denomId = denomId;
        this.name = name;
        this.uri = uri;
        this.data = data;
        this.recipient = recipient;
    }
}

export class NftModule {

    private readonly _client: ClientSimulateFn

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        registerMsgs(client.registry, [
            msgIssueDenom,
            msgTransferNft,
            msgApproveNft,
            msgApproveAllNft,
            msgRevokeNft,
            msgEditNFT,
            msgMintNFT,
            msgBurnNFT
        ]);
    }

    public async msgIssueDenom(
        id: string,
        name: string,
        schema: string,
        sender: string,
        contractAddressSigner: string,
        symbol: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidNftDenomId(id);
        checkValidAddress(sender);

        const msg = {
            typeUrl: msgIssueDenom.typeUrl,
            value: msgIssueDenom.type.fromPartial({
                id,
                name,
                schema,
                sender,
                contractAddressSigner,
                symbol,
            }),
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgTransferNft(
        denomId: string,
        tokenId: string,
        from: string,
        to: string,
        sender: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidNftDenomId(denomId);
        checkValidAddress(sender);
        checkValidAddress(from);
        checkValidAddress(to);

        if (tokenId.length === 0) {
            throw Error("Invalid name");
        }

        const msg = {
            typeUrl: msgTransferNft.typeUrl,
            value: msgTransferNft.type.fromPartial({
                denomId,
                tokenId,
                from,
                to,
                sender,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgApproveNft(
        id: string,
        denomId: string,
        sender: string,
        approvedAddress: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidNftDenomId(denomId);
        checkValidAddress(sender);
        checkValidAddress(approvedAddress);

        const msg = {
            typeUrl: msgApproveNft.typeUrl,
            value: msgApproveNft.type.fromPartial({
                id,
                denomId,
                sender,
                approvedAddress,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgApproveAllNft(
        operator: string,
        sender: string,
        approved: boolean,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidAddress(sender);
        checkValidAddress(operator);

        const msg = {
            typeUrl: msgApproveAllNft.typeUrl,
            value: msgApproveAllNft.type.fromPartial({
                operator,
                sender,
                approved,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgRevokeNft(
        addressToRevoke: string,
        denomId: string,
        tokenId: string,
        sender: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidAddress(addressToRevoke);
        checkValidAddress(sender);
        checkValidNftDenomId(denomId);

        const msg = {
            typeUrl: msgRevokeNft.typeUrl,
            value: msgRevokeNft.type.fromPartial({
                addressToRevoke,
                denomId,
                tokenId,
                sender,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgEditNFT(
        id: string,
        denomId: string,
        name: string,
        uri: string,
        data: string,
        sender: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidAddress(sender);
        checkValidNftDenomId(denomId);

        const msg = {
            typeUrl: msgEditNFT.typeUrl,
            value: msgEditNFT.type.fromPartial({
                id,
                denomId,
                name,
                uri,
                data,
                sender,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgMintNFT(
        denomId: string,
        name: string,
        uri: string,
        data: string,
        sender: string,
        recipient: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidAddress(sender);
        checkValidAddress(recipient);
        checkValidNftDenomId(denomId);

        const msg = {
            typeUrl: msgMintNFT.typeUrl,
            value: msgMintNFT.type.fromPartial({
                denomId,
                name,
                uri,
                data,
                sender,
                recipient,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }

    public async msgMintMultipleNFT(
        nftInfos: NftInfo[],
        sender: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msgs: EncodeObject[], fee: StdFee }> {
        checkValidAddress(sender);

        const msgs: EncodeObject[] = [];

        nftInfos.forEach((nftInfo: NftInfo) => {
            checkValidAddress(nftInfo.recipient);
            checkValidNftDenomId(nftInfo.denomId);

            const msg = {
                typeUrl: msgMintNFT.typeUrl,
                value: msgMintNFT.type.fromPartial({
                    denomId: nftInfo.denomId,
                    name: nftInfo.name,
                    uri: nftInfo.uri,
                    data: nftInfo.data,
                    sender,
                    recipient: nftInfo.recipient,
                    contractAddressSigner,
                })
            };

            msgs.push(msg);
        })



        const fee = await estimateFee(this._client, sender, msgs, gasPrice, gasMultiplier, memo);

        return {
            msgs,
            fee
        }
    }

    public async msgBurnNFT(
        id: string,
        denomId: string,
        sender: string,
        contractAddressSigner: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = "",
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        checkValidAddress(sender);
        checkValidNftDenomId(denomId);

        const msg = {
            typeUrl: msgBurnNFT.typeUrl,
            value: msgBurnNFT.type.fromPartial({
                id,
                denomId,
                sender,
                contractAddressSigner,
            })
        };

        const fee = await estimateFee(this._client, sender, [msg], gasPrice, gasMultiplier, memo);

        return {
            msg,
            fee
        }
    }
}