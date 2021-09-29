import { makeCosmoshubPath } from "@cosmjs/amino"
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions, } from "@cosmjs/proto-signing"
import { EnglishMnemonic } from "@cosmjs/crypto";

const defaultCudosOptions: DirectSecp256k1HdWalletOptions = {
    bip39Password: "",
    hdPaths: [makeCosmoshubPath(0)],
    prefix: "cudos",
}


interface DirectSecp256k1HdWalletConstructorOptions extends Partial<DirectSecp256k1HdWalletOptions> {
    readonly seed: Uint8Array;
  }
  

export class CudosDirectSecp256k1HdWallet extends DirectSecp256k1HdWallet {
    protected constructor(mnemonic: EnglishMnemonic, options: DirectSecp256k1HdWalletConstructorOptions) {
        super(mnemonic, options ?? defaultCudosOptions)
    }
}