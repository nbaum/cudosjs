import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GravityExtension, setupGravityExtension } from "../queries";
import { checkValidAddress, checkValidValidatorAddress, checkValidNftDenomId, checkValidETHAddress } from "../../../../utils/checks";
import { CudosNetworkConsts } from "src/utils";

import{
    QueryClientImpl,
    QueryParamsResponse,
    QueryCurrentValsetResponse,
    QueryValsetRequestResponse,
    QueryValsetConfirmResponse,
    QueryValsetConfirmsByNonceResponse,
    QueryLastValsetRequestsResponse,
    QueryLastPendingValsetRequestByAddrResponse,
    QueryLastPendingBatchRequestByAddrResponse,
    QueryLastPendingLogicCallByAddrResponse,
    QueryLastEventNonceByAddrResponse,
    QueryBatchFeeResponse,
    QueryOutgoingTxBatchesResponse,
    QueryOutgoingLogicCallsResponse,
    QueryBatchRequestByNonceResponse,
    QueryBatchConfirmsResponse,
    QueryLogicConfirmsResponse,
    QueryERC20ToDenomResponse,
    QueryDenomToERC20Response,
    QueryAttestationsResponse,
    QueryDelegateKeysByValidatorAddressResponse,
    QueryDelegateKeysByEthAddressResponse,
    QueryDelegateKeysByOrchestratorAddressResponse,
    QueryPendingSendToEthResponse,

}from "../proto-types/query" 

export class GravityQueryClient{
    private readonly gravityQueryClient: QueryClient & GravityExtension;

    constructor(tmClient:Tendermint34Client) {
        this.gravityQueryClient = QueryClient.withExtensions(tmClient,setupGravityExtension)
    }

    public async getParams(): Promise<QueryParamsResponse> {
        return this.gravityQueryClient.gravity.params()
    }

    public async getCurrentValset(): Promise<QueryCurrentValsetResponse> {
        return this.gravityQueryClient.gravity.currentValset()
    }

    public async getValsetRequest(nonce: Long): Promise<QueryValsetRequestResponse> {
        return this.gravityQueryClient.gravity.valsetRequest(nonce)
    }

    public async getValsetConfirm(nonce: Long, address: string): Promise<QueryValsetConfirmResponse> {
        // Check for valid cudos address
        checkValidAddress(address)

        return this.gravityQueryClient.gravity.valsetConfirm(nonce,address)
    }

    public async getValsetConfirmsByNonce(nonce: Long): Promise<QueryValsetConfirmsByNonceResponse> {
        return this.gravityQueryClient.gravity.valsetConfirmsByNonce(nonce)
    }

    public async getLastValsetRequests(): Promise<QueryLastValsetRequestsResponse> {
        return this.gravityQueryClient.gravity.lastValsetRequests()
    }

    public async getLastPendingValsetRequestByAddr(address: string): Promise<QueryLastPendingValsetRequestByAddrResponse> {
        // Check for valid cudos address
        checkValidAddress(address)

        return this.gravityQueryClient.gravity.lastPendingValsetRequestByAddr(address)
    }

    public async getLastPendingBatchRequestByAddr(address: string): Promise<QueryLastPendingBatchRequestByAddrResponse> {
        // Check for valid cudos address
        checkValidAddress(address)

        return this.gravityQueryClient.gravity.LastPendingBatchRequestByAddr(address)
    }

    public async getLastPendingLogicCallByAddr(address: string): Promise<QueryLastPendingLogicCallByAddrResponse> {
        // Check for valid cudos address
        checkValidAddress(address)

        return this.gravityQueryClient.gravity.lastPendingLogicCallByAddr(address)
    }

    public async getLastEventNonceByAddr(address: string): Promise<QueryLastEventNonceByAddrResponse> {
        // Check for valid cudos address
        checkValidAddress(address)

        return this.gravityQueryClient.gravity.lastEventNonceByAddr(address)
    }

    public async getBatchFees(): Promise<QueryBatchFeeResponse> {
        return this.gravityQueryClient.gravity.batchFees()
    }

    public async getOutgoingTxBatches(): Promise<QueryOutgoingTxBatchesResponse> {
        return this.gravityQueryClient.gravity.outgoingTxBatches()
    }

    public async getOutgoingLogicCalls(): Promise<QueryOutgoingLogicCallsResponse> {
        return this.gravityQueryClient.gravity.outgoingLogicCalls()
    }

    public async getBatchRequestByNonce( nonce: Long, contractAddress: string): Promise<QueryBatchRequestByNonceResponse> {
        checkValidETHAddress(contractAddress)

        return this.gravityQueryClient.gravity.batchRequestByNonce(nonce,contractAddress)
    }

    public async getBatchConfirms( nonce: Long, contractAddress: string): Promise<QueryBatchConfirmsResponse> {
        checkValidETHAddress(contractAddress)

        return this.gravityQueryClient.gravity.batchConfirms(nonce,contractAddress)
    }

    public async getLogicConfirms( invalidationId: Uint8Array, invalidationNonce: Long ): Promise<QueryLogicConfirmsResponse> {
        return this.gravityQueryClient.gravity.logicConfirms(invalidationId,invalidationNonce)
    }

    public async getERC20ToDenom( erc20: string ): Promise<QueryERC20ToDenomResponse> {
        checkValidETHAddress(erc20)

        return this.gravityQueryClient.gravity.ERC20ToDenom(erc20)
    }

    public async getDenomToERC20( denom: string ): Promise<QueryDenomToERC20Response> {
        checkValidNftDenomId(denom)

        return this.gravityQueryClient.gravity.denomToERC20(denom)
    }

    public async getAttestations( limit: Long ): Promise<QueryAttestationsResponse> {
        return this.gravityQueryClient.gravity.getAttestations(limit)
    }

    public async getDelegateKeyByValidator( validatorAddress: string ): Promise<QueryDelegateKeysByValidatorAddressResponse> {
        checkValidValidatorAddress(validatorAddress)

        return this.gravityQueryClient.gravity.getDelegateKeyByValidator(validatorAddress)
    }

    public async getDelegateKeyByEth( ethAddress: string ): Promise<QueryDelegateKeysByEthAddressResponse> {
        checkValidETHAddress(ethAddress)

        return this.gravityQueryClient.gravity.getDelegateKeyByEth(ethAddress)
    }

    public async getDelegateKeyByOrchestrator( orchestratorAddress: string  ): Promise<QueryDelegateKeysByOrchestratorAddressResponse> {
        // Check for valid cudos address
        checkValidAddress(orchestratorAddress)

        return this.gravityQueryClient.gravity.getDelegateKeyByOrchestrator(orchestratorAddress)
    }

    public async getPendingSendToEth( senderAddress: string ): Promise<QueryPendingSendToEthResponse> {
        // Check for valid cudos address
        checkValidAddress(senderAddress)

        return this.gravityQueryClient.gravity.getPendingSendToEth(senderAddress)
    }

}