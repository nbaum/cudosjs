import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "@cosmjs/amino";
import { ACUDOS } from "../utils";

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