import { OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient, StdFee, GasPrice, calculateFee } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { groupTypes } from "./modules/group/messages";


export class CudosSigningStargateClient extends SigningStargateClient {
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
        groupTypes.forEach(([typeUrl, type]) => this.registry.register(typeUrl, type));
    }

    public async estimateFee(
        signer: string,
        messages: { typeUrl: string, value: any }[],
        gasPrice: GasPrice,
        gasMultiplier = 1.3,
        memo = ""
    ): Promise<StdFee> {
        const gasEstimation = await this.simulate(signer, messages, memo);
        const gasLimit = Math.round(gasEstimation * gasMultiplier);
        return calculateFee(gasLimit, gasPrice);
    }
}