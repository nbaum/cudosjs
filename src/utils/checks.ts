import { fromBech32 } from "@cosmjs/encoding";
import { BECH32_PREFIX_ACC_ADDR, BECH32_PREFIX_VAL_ADDR  } from "./constants";


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

// Validates the input string as an Ethereum Address
// Addresses must not be empty, have 42 character length, start with 0x and have 40 remaining characters in [0-9a-fA-F]
export function checkValidETHAddress(ethAddress: string) {
    // ETHContractAddressLen is the length of contract address strings
    const ETHContractAddressLen = 42
    const pattern = /^0x[0-9a-fA-F]{40}$/

    if (ethAddress === "") {
		throw Error("Empty ETH Address")
	}
	if (ethAddress.length != ETHContractAddressLen) {
        throw Error(`address(${ethAddress}) of the wrong length exp(${ETHContractAddressLen}) actual(${ethAddress.length})`)
	}
	if (!pattern.test(ethAddress)) {
        throw Error(`Invalid ETH Address`)
	}

}

export function checkValidValidatorAddress(address: string) {
    if(!isValidAddress(address,BECH32_PREFIX_VAL_ADDR)) {
        throw Error("Invalid Validator address.")
    }
}
