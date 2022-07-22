import { GasPrice, StdFee } from "@cosmjs/stargate";
import { ClientRegistry, ClientSimulateFn, estimateFee, registerMsgs} from "../../../utils";
import { msgSendToEth, msgSetMinFeeTransferToEth, msgCancelSendToEth } from "./types";
import { checkValidNftDenomId, checkValidAddress, checkValidETHAddress } from "../../../utils/checks";
import { coin, Coin } from "@cosmjs/proto-signing";
import { EncodeObject } from "@cosmjs/proto-signing";

export class GravityModule {
    private readonly _client: ClientSimulateFn

    constructor (client: ClientSimulateFn & ClientRegistry){
        this._client = client;
        registerMsgs(client.registry, [
            msgSendToEth,
            msgSetMinFeeTransferToEth,
            msgCancelSendToEth
        ])
    }

    public async msgSendToEth(
        sender: string,
        ethDest: string,
        amount: Coin,
        bridgeFee: Coin,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = ""
    ): Promise <{msg:EncodeObject, fee: StdFee}> {
        checkValidAddress(sender);
        checkValidETHAddress(ethDest)

        if (+amount.amount < 1){
            throw Error("Minimum amount to send is 1")
        }

        const msg = {
            typeUrl:msgSendToEth.typeUrl ,
            value: msgSendToEth.type.fromPartial ({
                sender,
                ethDest,
                amount,
                bridgeFee,
            })
        }

        const fee = await estimateFee(this._client,sender, [msg], gasPrice, gasMultiplier,memo)

        return {
            msg,
            fee
        }
    }

    public async msgSetMinFeeTransferToEth(
        sender: string,
        minFee: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = ""
    ): Promise <{msg:EncodeObject, fee: StdFee}> {
        checkValidAddress(sender);

        const msg = {
            typeUrl:msgSetMinFeeTransferToEth.typeUrl ,
            value: msgSetMinFeeTransferToEth.type.fromPartial ({
                sender,
                fee:minFee
            })
        }

        const fee = await estimateFee(this._client,sender, [msg], gasPrice, gasMultiplier,memo)

        return {
            msg,
            fee
        }
    }

    public async msgCancelSendToEth(
        transactionId: Long,
        sender: string,
        gasPrice: GasPrice,
        gasMultiplier: number = 1.3,
        memo: string = ""
    ): Promise <{msg:EncodeObject, fee: StdFee}> {
        checkValidAddress(sender);

        const msg = {
            typeUrl:msgCancelSendToEth.typeUrl ,
            value: msgCancelSendToEth.type.fromPartial ({
                transactionId,
                sender,
            })
        }

        const fee = await estimateFee(this._client,sender, [msg], gasPrice, gasMultiplier,memo)

        return {
            msg,
            fee
        }
    }
}


