import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient, StdFee, DeliverTxResponse } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { groupTypes } from "./modules/group/messages";
import { MsgCreateGroupWithPolicy } from "./modules/group/types/tx";
import { MemberRequest, ThresholdDecisionPolicy } from "./modules/group/types/types";


export class CudosSigningStargateClient extends SigningStargateClient {
    public static override async connectWithSigner(
        endpoint: string | HttpEndpoint,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CudosSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningStargateClient(tmClient, signer, options);
    }

    protected constructor(
        tmClient: Tendermint34Client,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options);
        if (!options.registry) {
            for (const [typeUrl, generatedType] of groupTypes) {
                this.registry.register(typeUrl, generatedType);
            }
        }
    }

    public async createGroupWithPolicy(
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
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
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
        const msg = {
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
        return await this.signAndBroadcast(admin, [msg], fee, memo);
    }
}