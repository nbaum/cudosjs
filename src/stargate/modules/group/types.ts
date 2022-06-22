import { MsgCreateGroupWithPolicy } from "./types/tx";
import { ThresholdDecisionPolicy, MemberRequest } from "./types/types";

export class GroupModuleTypes {
    static msgCreateGroupWithPolicy(
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
    ): { typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy", value: MsgCreateGroupWithPolicy } {
        const thresholdObj = ThresholdDecisionPolicy.fromPartial({
            threshold: decisionPolicy.threshold.toString(),
            windows: {
                votingPeriod: { seconds: decisionPolicy.votingPeriod },
                minExecutionPeriod: { seconds: decisionPolicy.minExecutionPeriod },
            }
        });
        const membersObj = members.map(m => MemberRequest.fromPartial({
            address: m.address,
            weight: m.weight.toString(),
            metadata: m.metadata,
        }))

        return {
            typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
            value: MsgCreateGroupWithPolicy.fromPartial({
                admin: admin,
                members: membersObj,
                groupMetadata: groupMetadata,
                groupPolicyMetadata: groupPolicyMetadata,
                groupPolicyAsAdmin: groupPolicyAsAdmin,
                decisionPolicy: {
                    typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy",
                    value: ThresholdDecisionPolicy.encode(thresholdObj).finish()
                },
            }),
        };
    }
}