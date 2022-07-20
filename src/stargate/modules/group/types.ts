import { MsgCreateGroupWithPolicy, MsgExec, MsgSubmitProposal, MsgVote, MsgWithdrawProposal } from "./proto-types/tx.pb";
import { ThresholdDecisionPolicy } from "./proto-types/types.pb";

const PREFIX = "/cosmos.group.v1."
export const msgCreateGroupWithPolicy = {
    typeUrl: PREFIX.concat("MsgCreateGroupWithPolicy"),
    type: MsgCreateGroupWithPolicy
};

export const msgSubmitProposal = {
    typeUrl: PREFIX.concat("MsgSubmitProposal"),
    type: MsgSubmitProposal
};

export const msgVote = {
    typeUrl: PREFIX.concat("MsgVote"),
    type: MsgVote
};

export const msgExec = {
    typeUrl: PREFIX.concat("MsgExec"),
    type: MsgExec
};

export const msgWithdrawProposal = {
    typeUrl: PREFIX.concat("MsgWithdrawProposal"),
    type: MsgWithdrawProposal
};

export const thresholdDecisionPolicy = {
    typeUrl: PREFIX.concat("ThresholdDecisionPolicy"),
    type: ThresholdDecisionPolicy
};
