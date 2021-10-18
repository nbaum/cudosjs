import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Coin, Tendermint34Client } from "src";
import { ACUDOS } from "src/utils";

export class CudosCosmWasmClient extends CosmWasmClient {

    public static override async connect(endpoint: string): Promise<CudosCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CudosCosmWasmClient(tmClient);
      }

      protected constructor(tmClient: Tendermint34Client | undefined) {
        super(tmClient);
      }
    
      public override async getBalance(address: string, searchDenom: string = ACUDOS): Promise<Coin> {
        return this.forceGetQueryClient().bank.balance(address, searchDenom);
      }
}