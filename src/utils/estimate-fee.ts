import { calculateFee, GasPrice, SigningStargateClient, StdFee } from "../stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { ClientSimulateFn } from "./module-utils";


export async function estimateFee(
    client: ClientSimulateFn,
    signer: string,
    messages: EncodeObject[],
    gasPrice: GasPrice,
    gasMultiplier = 1.3,
    memo = ""
): Promise<StdFee> {
    const gasEstimation = await client.simulate(signer, messages, memo);
    const gasLimit = Math.round(gasEstimation * gasMultiplier);
    return calculateFee(gasLimit, gasPrice);
}