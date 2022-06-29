import { GasPrice, SigningStargateClient, StdFee } from "../stargate";
import { EncodeObject } from "@cosmjs/proto-signing";
import { ClientSimulateFn } from "./module-utils";
import { coins } from "@cosmjs/amino";
import { Uint53 } from "@cosmjs/math"

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
    const { denom, amount: gasPriceAmount } = gasPrice;
    const amount = Math.ceil(gasPriceAmount.multiply(new Uint53(gasLimit)).toFloatApproximation());
    return {
        amount: coins(amount.toString(), denom),
        gas: gasLimit.toString(),
    };
}
