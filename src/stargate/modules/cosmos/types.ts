import {MsgGrant, MsgRevoke, MsgExec } from "cosmjs-types/cosmos/authz/v1beta1/tx"
import {MsgSend, MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import {MsgVerifyInvariant } from "cosmjs-types/cosmos/crisis/v1beta1/tx"
import {MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool,  } from "cosmjs-types/cosmos/distribution/v1beta1/tx"
import {MsgSubmitEvidence,  } from "cosmjs-types/cosmos/evidence/v1beta1/tx"
import {MsgGrantAllowance, MsgRevokeAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/tx"
import {MsgSubmitProposal, MsgVote, MsgVoteWeighted, MsgDeposit} from "cosmjs-types/cosmos/gov/v1beta1/tx"
import {MsgUnjail} from "cosmjs-types/cosmos/slashing/v1beta1/tx"
import {MsgCreateValidator,MsgEditValidator,MsgDelegate, MsgUndelegate,MsgBeginRedelegate  } from "cosmjs-types/cosmos/staking/v1beta1/tx"
import { MsgCreateVestingAccount } from "cosmjs-types/cosmos/vesting/v1beta1/tx"
import { TsProtoGeneratedType } from "@cosmjs/proto-signing"
import * as balbla from "protobufjs"



const PREFIX_AUTHZ = "/cosmos.authz.v1beta1."
const PREFIX_BANK = "/cosmos.bank.v1beta1."
const PREFIX_CRISIS = "/cosmos.crisis.v1beta1."
const PREFIX_DIST = "/cosmos.distribution.v1beta1."
const PREFIX_EVIDENCE = "/cosmos.evidence.v1beta1."
const PREFIX_FEEGRANT = "/cosmos.feegrant.v1beta1."
const PREFIX_GOV = "/cosmos.gov.v1beta1."
const PREFIX_SLASH = "/cosmos.slashing.v1beta1."
const PREFIX_STAKING = "/cosmos.staking.v1beta1."
const PREFIX_VESTING = "/cosmos.vesting.v1beta1."

type CosmosType<T> = {
    typeUrl: string,
    type:T
}


export const msgGrant:CosmosType<typeof MsgGrant> = {
    typeUrl: PREFIX_AUTHZ.concat("MsgGrant"),
    type:MsgGrant, 
}

export const msgRevoke:CosmosType<typeof MsgRevoke> = {
    typeUrl: PREFIX_AUTHZ.concat("MsgRevoke"),
    type:MsgRevoke
}

export const msgExec:CosmosType<typeof MsgExec> = {
    typeUrl: PREFIX_AUTHZ.concat("MsgExec"),
    type:MsgExec
}

export const msgSend:CosmosType<typeof MsgSend> = {
    typeUrl: PREFIX_BANK.concat("MsgSend"),
    type:MsgSend
}

export const msgMultiSend:CosmosType<typeof MsgMultiSend> = {
    typeUrl: PREFIX_BANK.concat("MsgMultiSend"),
    type:MsgMultiSend
}

export const msgVerifyInvariant:CosmosType<typeof MsgVerifyInvariant> = {
    typeUrl: PREFIX_CRISIS.concat("MsgVerifyInvariant"),
    type:MsgVerifyInvariant
}

export const msgSetWithdrawAddress:CosmosType<typeof MsgSetWithdrawAddress> = {
    typeUrl: PREFIX_DIST.concat("MsgSetWithdrawAddress"),
    type:MsgSetWithdrawAddress
}

export const msgWithdrawDelegatorReward:CosmosType<typeof MsgWithdrawDelegatorReward> = {
    typeUrl: PREFIX_DIST.concat("MsgWithdrawDelegatorReward"),
    type:MsgWithdrawDelegatorReward
}

export const msgWithdrawValidatorCommission: CosmosType<typeof MsgWithdrawValidatorCommission> = {
    typeUrl: PREFIX_DIST.concat("MsgWithdrawValidatorCommission"),
    type:MsgWithdrawValidatorCommission
}

export const msgFundCommunityPool:CosmosType<typeof MsgFundCommunityPool> = {
    typeUrl: PREFIX_DIST.concat("MsgFundCommunityPool"),
    type:MsgFundCommunityPool
}

export const msgSubmitEvidence:CosmosType<typeof MsgSubmitEvidence> = {
    typeUrl: PREFIX_EVIDENCE.concat("MsgSubmitEvidence"),
    type:MsgSubmitEvidence
}

export const msgGrantAllowance:CosmosType<typeof MsgGrantAllowance> = {
    typeUrl: PREFIX_FEEGRANT.concat("MsgGrantAllowance"),
    type:MsgGrantAllowance
}

export const msgRevokeAllowance:CosmosType<typeof MsgRevokeAllowance> = {
    typeUrl: PREFIX_FEEGRANT.concat("MsgRevokeAllowance"),
    type:MsgRevokeAllowance
}

export const msgSubmitProposal:CosmosType<typeof MsgSubmitProposal> = {
    typeUrl: PREFIX_GOV.concat("MsgSubmitProposal"),
    type:MsgSubmitProposal
}

export const msgVote:CosmosType<typeof MsgVote> = {
    typeUrl: PREFIX_GOV.concat("MsgVote"),
    type:MsgVote
}

export const msgVoteWeighted:CosmosType<typeof MsgVoteWeighted> = {
    typeUrl: PREFIX_GOV.concat("MsgVoteWeighted"),
    type:MsgVoteWeighted
}

export const msgDeposit:CosmosType<typeof MsgDeposit> = {
    typeUrl: PREFIX_GOV.concat("MsgDeposit"),
    type:MsgDeposit
}

export const msgUnjail:CosmosType<typeof MsgUnjail> = {
    typeUrl: PREFIX_SLASH.concat("MsgUnjail"),
    type:MsgUnjail
}

export const msgCreateValidator:CosmosType<typeof MsgCreateValidator> = {
    typeUrl: PREFIX_STAKING.concat("MsgCreateValidator"),
    type:MsgCreateValidator
}

export const msgEditValidator:CosmosType<typeof MsgEditValidator> = {
    typeUrl: PREFIX_STAKING.concat("MsgEditValidator"),
    type:MsgEditValidator
}

export const msgDelegate:CosmosType<typeof MsgDelegate> = {
    typeUrl: PREFIX_STAKING.concat("MsgDelegate"),
    type:MsgDelegate
}

export const msgUndelegate:CosmosType<typeof MsgUndelegate> = {
    typeUrl: PREFIX_STAKING.concat("MsgUndelegate"),
    type:MsgUndelegate
}

export const msgBeginRedelegate:CosmosType<typeof MsgBeginRedelegate> = {
    typeUrl: PREFIX_STAKING.concat("MsgBeginRedelegate"),
    type:MsgBeginRedelegate
}


export const msgCreateVestingAccount:CosmosType<typeof MsgCreateVestingAccount> = {
    typeUrl: PREFIX_VESTING.concat("MsgCreateVestingAccount"),
    type:MsgCreateVestingAccount
}

