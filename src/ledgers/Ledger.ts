import BigNumber from 'bignumber.js';
import { OfflineSigner } from 'src/proto-signing';

export default abstract class Ledger {

    connected: boolean = false;
    accountAddress: string | null = null;
    offlineSigner: OfflineSigner | null = null;

    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract getBalance(): Promise<BigNumber>;
    abstract addAddressChangeCallback(callback: (adress: string) => void): void;
    abstract isConnected(): boolean;

    constructor() {
    }

    init() {
        this.connected = false;
        this.accountAddress = null;
        this.offlineSigner = null;
    }

}
