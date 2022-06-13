import { QueryClient, createProtobufRpcClient, BankExtension } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";
import { QueryClientImpl, QueryGroupInfoResponse, QueryGroupPolicyInfoResponse, QueryGroupMembersResponse, QueryGroupsByAdminResponse, QueryGroupPoliciesByGroupResponse, QueryGroupPoliciesByAdminResponse, QueryProposalResponse, QueryProposalsByGroupPolicyResponse, QueryVoteByProposalVoterResponse, QueryVotesByProposalResponse, QueryVotesByVoterResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./types/query";
import Long from "long";


export interface GroupExtension {
  readonly group: {
    readonly groupInfo: (groupId: number) => Promise<QueryGroupInfoResponse>;
    // readonly groupPolicyInfo: (address: string) => Promise<QueryGroupPolicyInfoResponse>;
    // readonly groupMembers: (groupId: number, paginationKey?: Uint8Array) => Promise<QueryGroupMembersResponse>;
    // readonly groupsByMember: (address: string, paginationKey?: Uint8Array) => Promise<QueryGroupsByAdminResponse>;
    // readonly groupPoliciesByGroup: (groupId: number, paginationKey?: Uint8Array) => Promise<QueryGroupPoliciesByGroupResponse>;
    // readonly groupPoliciesByAdmin: (address: string, paginationKey?: Uint8Array) => Promise<QueryGroupPoliciesByAdminResponse>;
    // readonly proposal: (proposalId: number) => Promise<QueryProposalResponse>;
    // readonly proposalsByGroupPolicy: (address: string, paginationKey?: Uint8Array) => Promise<QueryProposalsByGroupPolicyResponse>;
    // readonly vote: (proposalId: number, address: string) => Promise<QueryVoteByProposalVoterResponse>;
    // readonly votesByProposal: (proposalId: number, paginationKey?: Uint8Array) => Promise<QueryVotesByProposalResponse>;
    // readonly votesByVoter: (address: string, paginationKey?: Uint8Array) => Promise<QueryVotesByVoterResponse>;
    // readonly tallyResult: (proposalId: number) => Promise<QueryTallyResultResponse>;
  };
}

export function setupGroupExtension(base: QueryClient): GroupExtension {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    group: {
      groupInfo: async (groupId: number) => {
        return await queryService.GroupInfo({ groupId: Long.fromNumber(groupId) });
      }
    },
  };
}
