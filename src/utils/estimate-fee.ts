import { calculateFee, GasPrice, SigningStargateClient, StdFee } from "../stargate";

export type EstimateFeeFn = (
    signer: string,
    messages: { typeUrl: string, value: any }[],
    gasPrice: GasPrice,
    gasMultiplier?: number,
    memo?: string
) => Promise<StdFee>;

export function getEstimateFeeFunction(client: SigningStargateClient): EstimateFeeFn {
    return async function (
        signer: string,
        messages: { typeUrl: string, value: any }[],
        gasPrice: GasPrice,
        gasMultiplier = 1.3,
        memo = ""
    ): Promise<StdFee> {
        const gasEstimation = await client.simulate(signer, messages, memo);
        const gasLimit = Math.round(gasEstimation * gasMultiplier);
        return calculateFee(gasLimit, gasPrice);
    }
}