import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GroupExtension, setupGroupExtension } from "./modules/group/queries";
import { QueryGroupInfoResponse } from "./modules/group/types/query";


export class CudosStargateClient extends StargateClient {
    private readonly groupQueryClient: QueryClient & GroupExtension;

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
    }

    public async getGroupInfo(groupId: number): Promise<QueryGroupInfoResponse> {
        // todo check if ! on the end works 
        return this.groupQueryClient.group.groupInfo(groupId)!;
    }

}