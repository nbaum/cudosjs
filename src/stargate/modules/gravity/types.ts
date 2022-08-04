import { MsgSendToEth,MsgSetMinFeeTransferToEth ,MsgCancelSendToEth, MsgSetOrchestratorAddress, MsgValsetConfirm, MsgRequestBatch, MsgConfirmBatch, MsgConfirmLogicCall, MsgSendToCosmosClaim, MsgBatchSendToEthClaim, MsgERC20DeployedClaim, MsgLogicCallExecutedClaim, MsgValsetUpdatedClaim, MsgSubmitBadSignatureEvidence} from "./proto-types/msgs";

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

export const msgSetOrchestratorAddress = {
    typeUrl: PREFIX.concat("MsgSetOrchestratorAddress"),
    type:MsgSetOrchestratorAddress
}

export const msgValsetConfirm = {
    typeUrl: PREFIX.concat("MsgValsetConfirm"),
    type:MsgValsetConfirm
}

export const msgRequestBatch = {
    typeUrl: PREFIX.concat("MsgRequestBatch"),
    type:MsgRequestBatch
}

export const msgConfirmBatch = {
    typeUrl: PREFIX.concat("MsgConfirmBatch"),
    type:MsgConfirmBatch
}

export const msgConfirmLogicCall = {
    typeUrl: PREFIX.concat("MsgConfirmLogicCall"),
    type:MsgConfirmLogicCall
}

export const msgSendToCosmosClaim = {
    typeUrl: PREFIX.concat("MsgSendToCosmosClaim"),
    type:MsgSendToCosmosClaim
}

export const msgBatchSendToEthClaim = {
    typeUrl: PREFIX.concat("MsgBatchSendToEthClaim"),
    type:MsgBatchSendToEthClaim
}

export const msgERC20DeployedClaim = {
    typeUrl: PREFIX.concat("MsgERC20DeployedClaim"),
    type:MsgERC20DeployedClaim
}

export const msgLogicCallExecutedClaim = {
    typeUrl: PREFIX.concat("MsgLogicCallExecutedClaim"),
    type:MsgLogicCallExecutedClaim
}

export const msgValsetUpdatedClaim = {
    typeUrl: PREFIX.concat("MsgValsetUpdatedClaim"),
    type:MsgValsetUpdatedClaim
}

export const msgSubmitBadSignatureEvidence = {
    typeUrl: PREFIX.concat("MsgSubmitBadSignatureEvidence"),
    type:MsgSubmitBadSignatureEvidence
}
