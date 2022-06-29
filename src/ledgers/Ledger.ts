import BigNumber from 'bignumber.js';

export default abstract class Ledger {

    connected: boolean = false;
    accountAddress: string | null = null;

    abstract connect(): Promise < void >;
    abstract disconnect(): Promise < void >;
    abstract getBalance(): Promise < BigNumber >;

    abstract isConnected(): boolean;

    constructor() {
    }

    init() {
        this.connected = false;
        this.accountAddress = null;
    }

}
