import { MsgCreateGroupWithPolicy, MsgSubmitProposal } from "./proto-types/tx.pb";
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

export const thresholdDecisionPolicy = {
    typeUrl: PREFIX.concat("ThresholdDecisionPolicy"),
    type: ThresholdDecisionPolicy
};
