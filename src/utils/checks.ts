import { fromBech32 } from "@cosmjs/encoding";
import { BECH32_PREFIX_ACC_ADDR  } from "./constants";

export function isValidAddress(address: string, requiredPrefix?: string): boolean {
    if (requiredPrefix === undefined) {
        requiredPrefix = BECH32_PREFIX_ACC_ADDR;
    }

    try {
        const { prefix, data } = fromBech32(address);

        if (prefix !== requiredPrefix) {
            return false;
        }
        return data.length === 20;
    } catch {
      return false;
    }
}

export function checkValidAddress(address: string) {
    if(!isValidAddress(address)) {
        throw Error("Invalid address.")
    }
}

export function checkValidNftDenomId(denomId: string) {
    // start with lower case englsh letter and contain only lowercase letters and digits
    const pattern = /^[a-z][a-z\d]*$/;
    if (!pattern.test(denomId)) {
        throw Error("Invalid denom id - only accepts lowercase alphanumeric characters, and begin with an english letter");
    }
}
