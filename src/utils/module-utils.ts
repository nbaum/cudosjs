import { EncodeObject, GeneratedType, Registry } from "@cosmjs/proto-signing";

export type ClientSimulateFn = {
    simulate(
        signerAddress: string,
        messages: readonly EncodeObject[],
        memo: string | undefined
    ): Promise<number>;
};

export type ClientRegistry = { readonly registry: Registry };

export type ProtoType = { typeUrl: string, type: GeneratedType };

export function registerMsgs(registry: Registry, msgs: ProtoType[]) {
    return msgs.forEach(m => registry.register(m.typeUrl, m.type))
}
