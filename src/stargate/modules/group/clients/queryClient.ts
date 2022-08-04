import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { GroupExtension, setupGroupExtension } from "../../../modules/group/queries";
import { QueryGroupInfoResponse } from "../proto-types/query.pb";

export class GroupQueryClient{
    private readonly groupQueryClient: QueryClient & GroupExtension;

    constructor(tmClient:Tendermint34Client) {
        this.groupQueryClient = QueryClient.withExtensions(tmClient,setupGroupExtension)
    }

    public async getGroupInfo(groupId: number): Promise<QueryGroupInfoResponse> {
        // todo check if ! on the end works 
        return this.groupQueryClient.group.groupInfo(groupId);
    }

}