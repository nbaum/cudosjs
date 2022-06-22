import { EncodeObject } from "@cosmjs/proto-signing";
import { GasPrice, StdFee } from "src/stargate";
import { EstimateFeeFn } from "../../../utils";
import { MsgCreateGroupWithPolicy, MsgSubmitProposal } from "./types/tx";
import { ThresholdDecisionPolicy, MemberRequest } from "./types/types";

export class GroupModule {
  private readonly _estimateFee: EstimateFeeFn;

  public readonly msgs = {
    msgCreateGroupWithPolicy: {
      typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
      type: MsgCreateGroupWithPolicy
    },
    msgSubmitProposal: {
      typeUrl: "/cosmos",
      type: MsgSubmitProposal
    }
  };

  public readonly types = {
    thresholdDecisionPolicy: {
      typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy",
      type: ThresholdDecisionPolicy
    }
  };

  constructor(estimateFeeFn: EstimateFeeFn) {
    this._estimateFee = estimateFeeFn;
  }

  public async msgCreateGroupWithPolicy(
    msg: {
      admin: string,
      members: {
        address: string;
        weight: number;
        metadata: string;
      }[],
      groupMetadata: string,
      groupPolicyMetadata: string,
      groupPolicyAsAdmin: boolean,
      decisionPolicy: {
        threshold: number,
        votingPeriod: number,
        minExecutionPeriod: number
      }
    },
    gasPrice: GasPrice,
    gasMultiplier = 1.3,
    memo = ""
  ): Promise<{ msg: EncodeObject, fee: StdFee }> {
    const threshold = ThresholdDecisionPolicy.fromPartial({
      threshold: msg.decisionPolicy.threshold.toString(),
      windows: {
        votingPeriod: { seconds: msg.decisionPolicy.votingPeriod },
        minExecutionPeriod: { seconds: msg.decisionPolicy.minExecutionPeriod },
      }
    });
    const members = msg.members.map(m => MemberRequest.fromPartial({
      address: m.address,
      weight: m.weight.toString(),
      metadata: m.metadata,
    }))
    const msgEncoded = {
      typeUrl: this.msgs.msgCreateGroupWithPolicy.typeUrl,
      value: MsgCreateGroupWithPolicy.fromPartial({
        admin: msg.admin,
        members: members,
        groupMetadata: msg.groupMetadata,
        groupPolicyMetadata: msg.groupPolicyMetadata,
        groupPolicyAsAdmin: msg.groupPolicyAsAdmin,
        decisionPolicy: {
          typeUrl: this.types.thresholdDecisionPolicy.typeUrl,
          value: ThresholdDecisionPolicy.encode(threshold).finish()
        },
      }),
    };
    const fee = await this._estimateFee(msg.admin, [msgEncoded], gasPrice, gasMultiplier, memo);
    return {
      msg: msgEncoded,
      fee: fee
    }
  }
}