import { MsgSendToEth,MsgSetMinFeeTransferToEth ,MsgCancelSendToEth} from "./proto-types/msgs";

const PREFIX = "/gravity.v1."

export const msgSendToEth = {
    typeUrl: PREFIX.concat("MsgSendToEth"),
    type:MsgSendToEth
}
export const msgSetMinFeeTransferToEth = {
    typeUrl: PREFIX.concat("MsgSetMinFeeTransferToEth"),
    type:MsgSetMinFeeTransferToEth
}
export const msgCancelSendToEth = {
    typeUrl: PREFIX.concat("MsgCancelSendToEth"),
    type:MsgCancelSendToEth
}
