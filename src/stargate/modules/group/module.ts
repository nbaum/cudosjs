import { Coin, EncodeObject } from "@cosmjs/proto-signing";
import { estimateFee, ClientSimulateFn, registerMsgs, ClientRegistry, DEFAULT_GAS_MULTIPLIER } from "../../../utils";
import { GasPrice, StdFee } from "../..";
import { Exec, MsgCreateGroupWithPolicy, MsgSubmitProposal, MsgUpdateGroupMetadata, MsgVote, MsgExec, MsgWithdrawProposal } from "./proto-types/tx.pb";
import { ThresholdDecisionPolicy, Member, VoteOption } from "./proto-types/types.pb";
import { msgCreateGroupWithPolicy, msgSubmitProposal, thresholdDecisionPolicy, msgVote, msgExec } from "./types";
import { MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"


export class GroupModule {
    private readonly _client: ClientSimulateFn

    constructor(client: ClientSimulateFn & ClientRegistry) {
        this._client = client;
        registerMsgs(client.registry, [
            msgCreateGroupWithPolicy,
            msgSubmitProposal,
            msgVote,
            msgExec
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
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
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

    public async msgMultiSendProposal(
        sender: {
            address: string,
            coins: Coin[]
        }[],
        recipients: {
            address: string,
            coins: Coin[]
        }[],
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const multisendMsg = MsgMultiSend.fromPartial({
            inputs: sender,
            outputs: recipients,
        });

        const msgEncoded = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                address: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: [{
                    type_url: "/cosmos.bank.v1beta1.MsgMultiSend",
                    value: MsgMultiSend.encode(multisendMsg).finish()
                }],
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgSubmitProposal(
        multisigAddress: string,
        proposer: string,
        proposalMetadata: string,
        messages: { type_url: string; value: Uint8Array; }[],
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgSubmitProposal.typeUrl,
            value: MsgSubmitProposal.fromPartial({
                address: multisigAddress,
                proposers: [proposer],
                metadata: proposalMetadata,
                messages: messages,
            })
        }

        const fee = await estimateFee(this._client, proposer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgVote(
        proposalId: number,
        voter: string,
        voteOption: VoteOption,
        metadata: string,
        tryExec: Exec,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgVote.typeUrl,
            value: MsgVote.fromPartial({
                proposal_id: proposalId,
                voter: voter,
                option: voteOption,
                metadata: metadata,
                exec: tryExec
            })
        }

        const fee = await estimateFee(this._client, voter, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgExec(
        proposalId: number,
        signer: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgExec.typeUrl,
            value: MsgExec.fromPartial({
                proposal_id: proposalId,
                signer: signer
            })
        }

        const fee = await estimateFee(this._client, signer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }

    public async msgWithdrawProposal(
        proposalId: number,
        multisigAddress: string,
        signer: string,
        gasPrice: GasPrice,
        gasMultiplier = DEFAULT_GAS_MULTIPLIER,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const msgEncoded = {
            typeUrl: msgVote.typeUrl,
            value: MsgWithdrawProposal.fromPartial({
                proposal_id: proposalId,
                address: multisigAddress
            })
        }

        const fee = await estimateFee(this._client, signer, [msgEncoded], gasPrice, gasMultiplier, memo);

        return {
            msg: msgEncoded,
            fee: fee
        }
    }
}