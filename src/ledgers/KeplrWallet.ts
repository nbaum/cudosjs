import BigNumber from 'bignumber.js';

import Ledger from './Ledger';
import { CudosNetworkConsts } from '../utils';

declare let fetch: (url: string) => Promise<any>;

declare let window: {
    keplr: any;
    getOfflineSigner: any;
    addEventListener: (eventName: string, callback: () => void) => void;
    removeEventListener: (eventName: string, callback: () => void) => void;
}

export interface KeplrWalletConfig {
    CHAIN_ID: string,
    CHAIN_NAME: string,
    RPC: string,
    API: string,
    STAKING: string,
    GAS_PRICE: string,
}

export class KeplrWallet extends Ledger {

    keplrWalletConfig: KeplrWalletConfig;
    addressChangeCallbacks: ((address: string) => void)[];

    constructor(keplrWalletConfig: KeplrWalletConfig) {
        super();
        this.keplrWalletConfig = keplrWalletConfig;
        this.addressChangeCallbacks = [];
    }

    async connect(): Promise<void> {
        if (!window.keplr) {
            throw new Error('Failed to get balance!');
        }

        try {
            await window.keplr.experimentalSuggestChain({
                // Chain-id of the Cosmos SDK chain.
                chainId: this.keplrWalletConfig.CHAIN_ID,
                // The name of the chain to be displayed to the user.
                chainName: this.keplrWalletConfig.CHAIN_NAME,
                // RPC endpoint of the chain.
                rpc: this.keplrWalletConfig.RPC,
                // REST endpoint of the chain.
                rest: this.keplrWalletConfig.API,
                // Staking coin information
                stakeCurrency: {
                    // Coin denomination to be displayed to the user.
                    coinDenom: CudosNetworkConsts.CURRENCY_DISPLAY_NAME,
                    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                    coinMinimalDenom: CudosNetworkConsts.CURRENCY_DENOM,
                    // # of decimal points to convert minimal denomination to user-facing denomination.
                    coinDecimals: CudosNetworkConsts.CURRENCY_DECIMALS,
                    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                    coinGeckoId: CudosNetworkConsts.CURRENCY_COINGECKO_ID,
                },
                // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
                // The 'stake' button in Keplr extension will link to the webpage.
                walletUrlForStaking: this.keplrWalletConfig.STAKING,
                // The BIP44 path.
                bip44: {
                    // You can only set the coin type of BIP44.
                    // 'Purpose' is fixed to 44.
                    coinType: CudosNetworkConsts.LEDGER_COIN_TYPE,
                },
                bech32Config: {
                    bech32PrefixAccAddr: CudosNetworkConsts.BECH32_PREFIX_ACC_ADDR,
                    bech32PrefixAccPub: CudosNetworkConsts.BECH32_PREFIX_ACC_PUB,
                    bech32PrefixValAddr: CudosNetworkConsts.BECH32_PREFIX_VAL_ADDR,
                    bech32PrefixValPub: CudosNetworkConsts.BECH32_PREFIX_VAL_PUB,
                    bech32PrefixConsAddr: CudosNetworkConsts.BECH32_PREFIX_CONS_ADDR,
                    bech32PrefixConsPub: CudosNetworkConsts.BECH32_PREFIX_CONS_PUB,
                },
                // List of all coin/tokens used in this chain.
                currencies: [{
                    // Coin denomination to be displayed to the user.
                    coinDenom: CudosNetworkConsts.CURRENCY_DISPLAY_NAME,
                    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                    coinMinimalDenom: CudosNetworkConsts.CURRENCY_DENOM,
                    // # of decimal points to convert minimal denomination to user-facing denomination.
                    coinDecimals: CudosNetworkConsts.CURRENCY_DECIMALS,
                    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                    coinGeckoId: CudosNetworkConsts.CURRENCY_COINGECKO_ID,
                }],
                // List of coin/tokens used as a fee token in this chain.
                feeCurrencies: [{
                    // Coin denomination to be displayed to the user.
                    coinDenom: CudosNetworkConsts.CURRENCY_DISPLAY_NAME,
                    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                    coinMinimalDenom: CudosNetworkConsts.CURRENCY_DENOM,
                    // # of decimal points to convert minimal denomination to user-facing denomination.
                    coinDecimals: CudosNetworkConsts.CURRENCY_DECIMALS,
                    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                    // coinGeckoId: Meteor.settings.public.coingeckoId,
                }],
                // (Optional) The number of the coin type.
                // This field is only used to fetch the address from ENS.
                // Ideally, it is recommended to be the same with BIP44 path's coin type.
                // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
                // So, this is separated to support such chains.
                coinType: CudosNetworkConsts.LEDGER_COIN_TYPE,
                // (Optional) This is used to set the fee of the transaction.
                // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                gasPriceStep: {
                    low: Number(this.keplrWalletConfig.GAS_PRICE),
                    average: Number(this.keplrWalletConfig.GAS_PRICE) * 2,
                    high: Number(this.keplrWalletConfig.GAS_PRICE) * 4,
                },
                features: [
                    "cosmwasm"
                ],
            });
        } catch (ex) {
            console.log(ex);
            throw new Error('Failed to suggest the chain');
        }

        // You should request Keplr to enable the wallet.
        // This method will ask the user whether or not to allow access if they haven't visited this website.
        // Also, it will request user to unlock the wallet if the wallet is locked.
        // If you don't request enabling before usage, there is no guarantee that other methods will work.
        try {
            await window.keplr.enable(this.keplrWalletConfig.CHAIN_ID);

            window.keplr.defaultOptions = {
                sign: {
                    preferNoSetFee: true,
                },
            };

            const offlineSigner = window.getOfflineSigner(this.keplrWalletConfig.CHAIN_ID);

            this.offlineSigner = offlineSigner;
            this.accountAddress = (await offlineSigner.getAccounts())[0].address;
            this.connected = true;
            // this.network = await offlineSigner.get

            window.addEventListener("keplr_keystorechange", this.accountChangeEventListener);

        } catch (error) {
            throw new Error('Failed to connect to Keplr!');
        }


    }

    async disconnect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.init();
            window.removeEventListener('keplr_keystorechange', this.accountChangeEventListener);
            resolve();
        });
    }

    async getBalance(): Promise<BigNumber> {
        try {
            const offlineSigner = window.getOfflineSigner(this.keplrWalletConfig.CHAIN_ID);
            const account = (await offlineSigner.getAccounts())[0];

            const url = `${this.keplrWalletConfig.API}/cosmos/bank/v1beta1/balances/${account.address}/by_denom?denom=${CudosNetworkConsts.CURRENCY_DENOM}`;
            const amount = (await (await fetch(url)).json()).balance.amount;

            return new BigNumber(amount).div(CudosNetworkConsts.CURRENCY_1_CUDO);
        } catch (e) {
            console.log(e);
            throw new Error('Failed to get balance!');
        }
    }

    isConnected(): boolean {
        return this.connected === true;
    }

    addAddressChangeCallback(callback: (address: string) => void) {
        this.addressChangeCallbacks.push(callback);
    }

    removeAddressChangeCallback(callback: (address: string) => void) {
        this.addressChangeCallbacks = this.addressChangeCallbacks.filter((func: (address: string) => void) => func === callback);
    }

    private accountChangeEventListener = async (): Promise<void> => {
        if (this.offlineSigner !== null && this.offlineSigner !== undefined) {
            this.accountAddress = (await this.offlineSigner.getAccounts())[0].address;
        }

        this.addressChangeCallbacks.forEach((callback: (address: string) => void) => callback(this.accountAddress ?? ''));
    }
}
