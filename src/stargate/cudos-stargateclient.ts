import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GroupExtension, setupGroupExtension } from "./modules/group/queries";
import { QueryGroupInfoResponse } from "./modules/group/proto-types/query.pb";
import { NftExtension, setupNftExtension } from "./modules/nft/queries";
import { QueryCollectionResponse, QueryOwnerResponse, QuerySupplyResponse } from "./modules/nft/proto-types/query";
import { isValidAddress, checkValidNftDenomId, checkValidAddress } from "../utils/checks";
import { SigningStargateClient } from ".";

export class CudosStargateClient extends StargateClient {
    private readonly groupQueryClient: QueryClient & GroupExtension;
    private readonly nftQueryClient: QueryClient & NftExtension;

    public static override async connect(
        endpoint: string | HttpEndpoint,
        options: StargateClientOptions = {}
    ): Promise<CudosStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosStargateClient(tmClient, options);
    }

    protected constructor(tmClient: Tendermint34Client, options: StargateClientOptions) {
        super(tmClient, options);
        this.groupQueryClient = QueryClient.withExtensions(tmClient, setupGroupExtension);
        this.nftQueryClient = QueryClient.withExtensions(tmClient, setupNftExtension);
    }

    public async getGroupInfo(groupId: number): Promise<QueryGroupInfoResponse> {
        // todo check if ! on the end works 
        return this.groupQueryClient.group.groupInfo(groupId);
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

    //TODO: implement pagination
    public async getNftOwner(owner: string, denomId?: string): Promise<QueryOwnerResponse> {
        checkValidAddress(owner);

        if (denomId !== undefined) {
            checkValidNftDenomId(denomId);
        } else {
            denomId = '';
        }

        return this.nftQueryClient.nft.owner(owner, denomId);
    }

    //TODO: implement pagination
    public async getNftCollection(denomId: string): Promise<QueryCollectionResponse> {
        checkValidNftDenomId(denomId);

        return this.nftQueryClient.nft.collection(denomId);
    }

    
}