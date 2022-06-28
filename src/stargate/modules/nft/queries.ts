import { QueryClient, createProtobufRpcClient, BankExtension } from "@cosmjs/stargate";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

import { 
  QueryClientImpl,
  QuerySupplyResponse,
  QueryOwnerResponse,
  QueryCollectionResponse,
  QueryDenomResponse,
  QueryDenomByNameResponse,
  QueryDenomBySymbolResponse,
  QueryDenomsResponse,
  QueryNFTResponse,
  QueryApprovalsNFTResponse,
  QueryApprovalsIsApprovedForAllResponse,
} from "./proto-types/query";

import Long from "long";

export interface NftExtension {
  readonly nft: {
    readonly supply: (denomId: string, owner: string) => Promise<QuerySupplyResponse>;
    readonly owner: (owner: string, denomId: string, pagination?: PageRequest) => Promise<QueryOwnerResponse>;
    readonly collection: (denomId: string, pagination?: PageRequest) => Promise<QueryCollectionResponse>;
    readonly denom: (denomId: string) => Promise<QueryDenomResponse>;
    readonly denomByname: (denomName: string) => Promise<QueryDenomByNameResponse>;
    readonly denomBySymbol: (symbol: string) => Promise<QueryDenomBySymbolResponse>;
    readonly denoms: (pagination?: PageRequest) => Promise<QueryDenomsResponse>;
    readonly nft: (denomId: string, tokenId: string) => Promise<QueryNFTResponse>;
    readonly approvalsNft: (denomId: string, tokenId: string) => Promise<QueryApprovalsNFTResponse>;
    readonly isApprovedForAll: (owner: string, operator: string) => Promise<QueryApprovalsIsApprovedForAllResponse>;
  };
}

export function setupNftExtension(base: QueryClient): NftExtension {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    nft: {
      supply: async (denomId: string, owner: string) => {
        return queryService.Supply({ denomId, owner });
      },
      owner: async (owner: string, denomId: string, pagination?: PageRequest) => {
        return queryService.Owner({ owner, denomId, pagination });
      },
      collection: async (denomId: string, pagination?: PageRequest) => {
        return queryService.Collection({ denomId, pagination})
      },
      denom: async (denomId: string) => {
        return queryService.Denom({ denomId });
      },
      denomByname: async (denomName: string) => {
        return queryService.DenomByName({ denomName });
      },
      denomBySymbol: async (symbol: string) => {
        return queryService.DenomBySymbol({ symbol });
      },
      denoms: async (pagination?: PageRequest) => {
        return queryService.Denoms({ pagination });
      },
      nft: async (denomId: string, tokenId: string) => {
        return queryService.NFT({ denomId, tokenId });
      },
      approvalsNft: async (denomId: string, tokenId: string) => {
        return queryService.GetApprovalsNFT({ denomId, tokenId });
      },
      isApprovedForAll: async (owner: string, operator: string) => {
        return queryService.QueryApprovalsIsApprovedForAll({ owner, operator });
      }
    },
  };
}
