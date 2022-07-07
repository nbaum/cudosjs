import { EncodeObject } from "@cosmjs/proto-signing";
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry } from "../../../utils";
import { GasPrice, StdFee } from "../..";
import { MsgCreateGroupWithPolicy } from "./proto-types/tx.pb";
import { ThresholdDecisionPolicy, Member } from "./proto-types/types.pb";
import { msgCreateGroupWithPolicy, msgSubmitProposal, thresholdDecisionPolicy } from "./types";

export class GroupModule {
    private readonly _client: ClientSimulateFn

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        registerMsgs(client.registry, [
            msgCreateGroupWithPolicy,
            msgSubmitProposal
        ]);
    }

    public async msgCreateGroupWithPolicy(
        admin: string,
        members: {
            address: string;
            weight: number;
            metadata: string;
        }[],
        groupMetadata: string,
        groupPolicyMetadata: string,
        decisionPolicy: {
            threshold: number,
            votingPeriod: number,
            minExecutionPeriod: number
        },
        gasPrice: GasPrice,
        gasMultiplier = 1.3,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const threshold = ThresholdDecisionPolicy.fromPartial({
            threshold: decisionPolicy.threshold.toString(),
            windows: {
                voting_period: { seconds: decisionPolicy.votingPeriod },
                min_execution_period: { seconds: decisionPolicy.minExecutionPeriod },
            }
        });

        const membersEncoded = members.map(m => Member.fromPartial({
            address: m.address,
            weight: m.weight.toString(),
            metadata: m.metadata,
        }))

        const msgEncoded = {
            typeUrl: msgCreateGroupWithPolicy.typeUrl,
            value: MsgCreateGroupWithPolicy.fromPartial({
                admin: admin,
                members: membersEncoded,
                group_metadata: groupMetadata,
                group_policy_metadata: groupPolicyMetadata,
                group_policy_as_admin: true,
                decision_policy: {
                    type_url: thresholdDecisionPolicy.typeUrl,
                    value: ThresholdDecisionPolicy.encode(threshold).finish()
                },
            }),
        };

        const fee = await estimateFee(this._client, admin, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }
}