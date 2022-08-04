import { IndexedTx, QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GroupQueryClient } from "./modules/group/clients/queryClient";
import { NFTQueryClient } from "./modules/nft/clients/queryClient";
import { GravityQueryClient } from "./modules/gravity/clients/queryClient";

import { getFullRegistry } from "./full-registry";

import { DecodedTxRaw, DecodeObject, decodeTxRaw, Registry } from "@cosmjs/proto-signing";

export class CudosStargateClient extends StargateClient {
    private readonly groupQueryClient: GroupQueryClient;
    private readonly nftQueryClient: NFTQueryClient;
    private readonly gravityQueryClient: GravityQueryClient
    public readonly  registry: Registry


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
        this.registry = getFullRegistry()
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

    public async decodeQryResponse(resp: IndexedTx){
        const respCopy:any = {...resp}
        // Decoding the Trx
        const decodedTx:DecodedTxRaw = decodeTxRaw(respCopy.tx)
        // Decoding each message in the transaction
        for(let i =0; i< decodedTx.body.messages.length; i++){
            decodedTx.body.messages[i] = this.registry.decode(decodedTx.body.messages[i])
        }
        respCopy.tx = decodedTx 

        return respCopy
    }
    
}