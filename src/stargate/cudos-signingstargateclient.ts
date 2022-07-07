import { Coin, EncodeObject, OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions, SigningStargateClient, GasPrice, StdFee } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { estimateFee } from "../utils";
import { GroupModule } from "./modules/group/module";
import { MsgMultiSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"

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
        this.groupModule = new GroupModule(this);
    }

    public async msgMultisend(
        sender: {
            address: string,
            coins: Coin[]
        }[],
        recipients: {
            address: string,
            coins: Coin[]
        }[],
        gasPrice: GasPrice,
        gasMultiplier = 1.3,
        memo = ""
    ): Promise<{ msg: EncodeObject, fee: StdFee }> {
        const multisendMsg = {
            typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
            value: MsgMultiSend.fromPartial({
                inputs: sender,
                outputs: recipients,
            })
        };

        const fee = await estimateFee(this, sender[0].address, [multisendMsg], gasPrice, gasMultiplier, memo);

        return {
            msg: multisendMsg,
            fee: fee
        }
    }
}