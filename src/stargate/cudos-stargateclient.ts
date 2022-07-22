import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GroupQueryClient } from "./modules/group/clients/queryClient";
import { NFTQueryClient } from "./modules/nft/clients/queryClient";
import { GravityQueryClient } from "./modules/gravity/clients/queryClient";


import { SigningStargateClient } from ".";

export class CudosStargateClient extends StargateClient {
    private readonly groupQueryClient: GroupQueryClient;
    private readonly nftQueryClient: NFTQueryClient;
    private readonly gravityQueryClient: GravityQueryClient


    public static override async connect(
        endpoint: string | HttpEndpoint,
        options: StargateClientOptions = {}
    ): Promise<CudosStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosStargateClient(tmClient, options);
    }

    protected constructor(tmClient: Tendermint34Client, options: StargateClientOptions) {
        super(tmClient, options);
        this.groupQueryClient = new GroupQueryClient(tmClient)
        this.nftQueryClient =  new NFTQueryClient(tmClient)
        this.gravityQueryClient = new GravityQueryClient(tmClient)
    }

    get groupModule (): GroupQueryClient{
        return this.groupQueryClient
    }

    get nftModule (): NFTQueryClient{
        return this.nftQueryClient
    }

    get gravityModule (): GravityQueryClient{
        return this.gravityQueryClient
    }

    
}