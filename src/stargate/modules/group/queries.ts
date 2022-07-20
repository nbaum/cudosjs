import { QueryClient, createProtobufRpcClient, BankExtension } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";
import { QueryClientImpl, QueryGroupInfoResponse, QueryGroupPolicyInfoResponse, QueryGroupMembersResponse, QueryGroupsByAdminResponse, QueryGroupPoliciesByGroupResponse, QueryGroupPoliciesByAdminResponse, QueryProposalResponse, QueryProposalsByGroupPolicyResponse, QueryVoteByProposalVoterResponse, QueryVotesByProposalResponse, QueryVotesByVoterResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./proto-types/query.pb";
import Long from "long";
import { PageRequest } from "./proto-types/pagination";


export interface GroupExtension {
  readonly group: {
    readonly groupInfo: (groupId: number) => Promise<QueryGroupInfoResponse>;
    readonly groupPolicyInfo: (address: string) => Promise<QueryGroupPolicyInfoResponse>;
    readonly groupMembers: (groupId: number, paginationKey?: PageRequest | undefined) => Promise<QueryGroupMembersResponse>;
    readonly groupsByMember: (address: string, paginationKey?: PageRequest | undefined) => Promise<QueryGroupsByAdminResponse>;
    readonly groupPoliciesByGroup: (groupId: number, paginationKey?: PageRequest | undefined) => Promise<QueryGroupPoliciesByGroupResponse>;
    readonly groupPoliciesByAdmin: (address: string, paginationKey?: PageRequest | undefined) => Promise<QueryGroupPoliciesByAdminResponse>;
    readonly proposal: (proposalId: number) => Promise<QueryProposalResponse>;
    readonly proposalsByGroupPolicy: (address: string, paginationKey?: PageRequest | undefined) => Promise<QueryProposalsByGroupPolicyResponse>;
    readonly voteByProposalVoter: (proposalId: number, voter: string) => Promise<QueryVoteByProposalVoterResponse>;
    readonly votesByProposal: (proposalId: number, paginationKey?: PageRequest | undefined) => Promise<QueryVotesByProposalResponse>;
    readonly votesByVoter: (voter: string, paginationKey?: PageRequest | undefined) => Promise<QueryVotesByVoterResponse>;
    readonly tallyResult: (proposalId: number) => Promise<QueryTallyResultResponse>;
  };
}

export function setupGroupExtension(base: QueryClient): GroupExtension {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    group: {
      groupInfo: async (groupId: number) => {
        return queryService.GroupInfo({ group_id: groupId });
      },
      groupPolicyInfo: async (address: string) => {
        return queryService.GroupPolicyInfo({ address: address });
      },
      groupMembers: async (groupId: number, paginationKey?: PageRequest | undefined) => {
        return queryService.GroupMembers({ group_id: groupId, pagination: paginationKey });
      },
      groupsByMember: async (address: string, paginationKey?: PageRequest | undefined) => {
        return queryService.GroupsByMember({ address: address, pagination: paginationKey });
      },
      groupPoliciesByGroup: async (groupId: number, paginationKey?: PageRequest | undefined) => {
        return queryService.GroupPoliciesByGroup({ group_id: groupId, pagination: paginationKey });
      },
      groupPoliciesByAdmin: async (admin: string, paginationKey?: PageRequest | undefined) => {
        return queryService.GroupPoliciesByAdmin({ admin: admin, pagination: paginationKey });
      },
      proposal: async (proposalId: number) => {
        return queryService.Proposal({ proposal_id: proposalId });
      },
      proposalsByGroupPolicy: async (address: string, paginationKey?: PageRequest | undefined) => {
        return queryService.ProposalsByGroupPolicy({ address: address, pagination: paginationKey });
      },
      voteByProposalVoter: async (proposalId: number, voter: string) => {
        return queryService.VoteByProposalVoter({ proposal_id: proposalId, voter: voter });
      },
      votesByProposal: async (proposalId: number, paginationKey?: PageRequest | undefined) => {
        return queryService.VotesByProposal({ proposal_id: proposalId, pagination: paginationKey });
      },
      votesByVoter: async (voter: string, paginationKey?: PageRequest | undefined) => {
        return queryService.VotesByVoter({ voter: voter, pagination: paginationKey });
      },
      tallyResult: async (proposalId: number) => {
        return queryService.TallyResult({ proposal_id: proposalId });
      }
    },
  };
}
