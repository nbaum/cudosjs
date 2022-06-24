import { EncodeObject } from "@cosmjs/proto-signing";
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry } from "../../../utils";
import { GasPrice, StdFee } from "../..";
import { MsgCreateGroupWithPolicy } from "./proto-types/tx.pb";
import { ThresholdDecisionPolicy, MemberRequest } from "./proto-types/types.pb";
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
        groupPolicyAsAdmin: boolean,
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
                votingPeriod: { seconds: decisionPolicy.votingPeriod },
                minExecutionPeriod: { seconds: decisionPolicy.minExecutionPeriod },
            }
        });

        const membersEncoded = members.map(m => MemberRequest.fromPartial({
            address: m.address,
            weight: m.weight.toString(),
            metadata: m.metadata,
        }))

        const msgEncoded = {
            typeUrl: msgCreateGroupWithPolicy.typeUrl,
            value: MsgCreateGroupWithPolicy.fromPartial({
                admin: admin,
                members: membersEncoded,
                groupMetadata: groupMetadata,
                groupPolicyMetadata: groupPolicyMetadata,
                groupPolicyAsAdmin: groupPolicyAsAdmin,
                decisionPolicy: {
                    typeUrl: thresholdDecisionPolicy.typeUrl,
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