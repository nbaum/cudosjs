import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { getEstimateFeeFunction } from "../utils";
import { GroupModule } from "./modules/group/types";

export class CudosSigningStargateClient extends SigningStargateClient {
    public readonly groupModule: GroupModule;

    public static override async connectWithSigner(
        endpoint: string | HttpEndpoint,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<CudosSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningStargateClient(tmClient, signer, options);
    }

    protected constructor(
        tmClient: Tendermint34Client,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options);
        this.groupModule = new GroupModule(getEstimateFeeFunction(this));
        Object.values(this.groupModule.msgs).forEach(({ typeUrl, type }) => this.registry.register(typeUrl, type))
    }
}