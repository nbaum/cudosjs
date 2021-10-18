import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner, Tendermint34Client } from "src";

export class CudosSigningCosmWasmClient extends SigningCosmWasmClient {

    public static override async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<CudosSigningCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosSigningCosmWasmClient(tmClient, signer, options);
      }

      public static override async offline(
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
      ): Promise<CudosSigningCosmWasmClient> {
        return new CudosSigningCosmWasmClient(undefined, signer, options);
      }

      protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions,
      ) {
        super(tmClient, signer, options);
      }

}