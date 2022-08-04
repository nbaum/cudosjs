
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { NftExtension, setupNftExtension } from "../../../modules/nft/queries";
import { QueryApprovalsIsApprovedForAllResponse, QueryApprovalsNFTResponse, QueryCollectionResponse, QueryDenomByNameRequest, QueryDenomByNameResponse, QueryDenomBySymbolResponse, QueryDenomRequest, QueryDenomResponse, QueryDenomsResponse, QueryNFTResponse, QueryOwnerResponse, QuerySupplyResponse } from "../../../modules/nft/proto-types/query";
import { checkValidNftDenomId, checkValidAddress } from "../../../../utils/checks";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

export class NFTQueryClient{
    private readonly nftQueryClient: QueryClient & NftExtension;
    

    constructor(tmClient:Tendermint34Client) {
        this.nftQueryClient = QueryClient.withExtensions(tmClient,setupNftExtension)
    }

    public async getNftDenomSupply(denomId: string, owner?: string): Promise<QuerySupplyResponse> {
        checkValidNftDenomId(denomId);

        if (owner !== undefined) {
            checkValidAddress(owner);
        } else {
            owner = '';
        }

        return this.nftQueryClient.nft.supply(denomId, owner);
    }

    public async getNftOwner(owner: string, denomId?: string, pagination?: PageRequest): Promise<QueryOwnerResponse> {
        checkValidAddress(owner);

        if (denomId !== undefined) {
            checkValidNftDenomId(denomId);
        } else {
            denomId = '';
        }

        return this.nftQueryClient.nft.owner(owner, denomId, pagination);
    }

    public async getNftCollection(denomId: string, pagination?: PageRequest): Promise<QueryCollectionResponse> {
        checkValidNftDenomId(denomId);

        return this.nftQueryClient.nft.collection(denomId, pagination);
    }

    public async getNftDenom(denomId: string): Promise<QueryDenomResponse> {
        checkValidNftDenomId(denomId);

        return this.nftQueryClient.nft.denom(denomId);
    }

    public async getNftDenoms(pagination?: PageRequest): Promise<QueryDenomsResponse> {
        return this.nftQueryClient.nft.denoms(pagination);
    }

    public async getNftDenomByName(denomName: string): Promise<QueryDenomByNameResponse> {
        if(denomName.length === 0){
            throw Error("Name must be at least one symbol");
        }

        return this.nftQueryClient.nft.denomByName(denomName);
    }

    public async getNftDenomBySymbol(symbol: string): Promise<QueryDenomBySymbolResponse> {
        if(symbol.length === 0){
            throw Error("Symbol must be at lease one symbol");
        }

        return this.nftQueryClient.nft.denomByName(symbol);
    }
    
    public async getNftToken(denomId: string, tokenId: string): Promise<QueryNFTResponse> {
        checkValidNftDenomId(denomId);

        if (tokenId.length === 0) {
            throw Error("Token id must be at least 1 symbol long.");
        }

        return this.nftQueryClient.nft.nft(denomId, tokenId);
    }

    public async getNftApprovals(denomId: string, tokenId: string): Promise<QueryApprovalsNFTResponse> {
        checkValidNftDenomId(denomId);

        if (tokenId.length === 0) {
            throw Error("Token id must be at least 1 symbol long.");
        }

        return this.nftQueryClient.nft.approvalsNft(denomId, tokenId);
    }

    public async nftIsApprovedForAll(owner: string, operator: string): Promise<QueryApprovalsIsApprovedForAllResponse> {
        checkValidAddress(owner);
        checkValidAddress(operator);

        return this.nftQueryClient.nft.isApprovedForAll(owner, operator);
    }

}