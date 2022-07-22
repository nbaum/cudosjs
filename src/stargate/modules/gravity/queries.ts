import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";

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

}from "./proto-types/query" 

import Long from "long";
import { NftExtension } from "../nft/queries";

export interface GravityExtension {
    readonly gravity: {
        readonly params: () => Promise<QueryParamsResponse>;
        readonly currentValset: () => Promise<QueryCurrentValsetResponse>;
        readonly valsetRequest: (nonce: Long) => Promise<QueryValsetRequestResponse>;
        readonly valsetConfirm: (nonce: Long, address: string) => Promise<QueryValsetConfirmResponse>;
        readonly valsetConfirmsByNonce: (nonce: Long) => Promise<QueryValsetConfirmsByNonceResponse>;
        readonly lastValsetRequests: () => Promise<QueryLastValsetRequestsResponse>;
        readonly lastPendingValsetRequestByAddr: (address: string) => Promise<QueryLastPendingValsetRequestByAddrResponse>;
        readonly LastPendingBatchRequestByAddr: (address: string) => Promise<QueryLastPendingBatchRequestByAddrResponse>;
        readonly lastPendingLogicCallByAddr: (address: string) => Promise<QueryLastPendingLogicCallByAddrResponse>;
        readonly lastEventNonceByAddr: (address: string) => Promise<QueryLastEventNonceByAddrResponse>;
        readonly batchFees: () => Promise<QueryBatchFeeResponse>;
        readonly outgoingTxBatches: () => Promise<QueryOutgoingTxBatchesResponse>;
        readonly outgoingLogicCalls: () => Promise<QueryOutgoingLogicCallsResponse>;
        readonly batchRequestByNonce: ( nonce: Long, contractAddress: string ) => Promise<QueryBatchRequestByNonceResponse>;
        readonly batchConfirms: ( nonce: Long, contractAddress: string ) => Promise<QueryBatchConfirmsResponse>;
        readonly logicConfirms: ( invalidationId: Uint8Array, invalidationNonce: Long ) => Promise<QueryLogicConfirmsResponse>;
        readonly ERC20ToDenom: ( erc20: string ) => Promise<QueryERC20ToDenomResponse>;
        readonly denomToERC20: ( denom: string ) => Promise<QueryDenomToERC20Response>;
        readonly getAttestations: ( limit: Long ) => Promise<QueryAttestationsResponse>;
        readonly getDelegateKeyByValidator: (  validatorAddress: string ) => Promise<QueryDelegateKeysByValidatorAddressResponse>;
        readonly getDelegateKeyByEth: (  ethAddress: string ) => Promise<QueryDelegateKeysByEthAddressResponse>;
        readonly getDelegateKeyByOrchestrator: ( orchestratorAddress: string ) => Promise<QueryDelegateKeysByOrchestratorAddressResponse>;
        readonly getPendingSendToEth: ( senderAddress: string ) => Promise<QueryPendingSendToEthResponse>;
        

        
    }
}

export function setupGravityExtension(base:QueryClient): GravityExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        gravity:{
            params: async () => {
                return queryService.Params({})
            },
            currentValset: async () => {
                return  queryService.CurrentValset({})
            },
            valsetRequest: async (nonce: Long) => {
                return  queryService .ValsetRequest({nonce})
            },
            valsetConfirm: async (nonce: Long, address: string) => {
                return  queryService.ValsetConfirm({nonce,address})
            },
            valsetConfirmsByNonce: async (nonce: Long) => {
                return  queryService.ValsetConfirmsByNonce({nonce})
            },
            lastValsetRequests: async () => {
                return  queryService.LastValsetRequests({})
            },
            lastPendingValsetRequestByAddr: async (address: string) => {
                return  queryService.LastPendingValsetRequestByAddr({address})
            },
            LastPendingBatchRequestByAddr: async (address: string) => {
                return  queryService.LastPendingBatchRequestByAddr({address})
            },
            lastPendingLogicCallByAddr: async (address: string) => {
                return  queryService.LastPendingLogicCallByAddr({address})
            },
            lastEventNonceByAddr: async (address: string) => {
                return  queryService.LastEventNonceByAddr({address})
            },
            batchFees: async () => {
                return  queryService.BatchFees({})
            },
            outgoingTxBatches: async () => {
                return  queryService .OutgoingTxBatches({})
            },
            outgoingLogicCalls: async () => {
                return  queryService.OutgoingLogicCalls({})
            },
            batchRequestByNonce: async ( nonce: Long, contractAddress: string ) => {
                return  queryService.BatchRequestByNonce({nonce, contractAddress})
            },
            batchConfirms: async ( nonce: Long, contractAddress: string ) => {
                return  queryService.BatchConfirms({nonce,contractAddress})
            },
            logicConfirms: async ( invalidationId: Uint8Array, invalidationNonce: Long ) => {
                return  queryService.LogicConfirms({invalidationId,invalidationNonce})
            },
            ERC20ToDenom: async ( erc20: string ) => {
                return  queryService.ERC20ToDenom({erc20})
            },
            denomToERC20: async ( denom: string ) => {
                return  queryService.DenomToERC20({denom}) 
            },
            getAttestations: async ( limit: Long ) => {
                return  queryService.GetAttestations({limit}) 
            },
            getDelegateKeyByValidator: async (  validatorAddress: string ) => {
                return  queryService.GetDelegateKeyByValidator({validatorAddress}) 
            },
            getDelegateKeyByEth: async (  ethAddress: string ) => {
                return  queryService .GetDelegateKeyByEth({ethAddress})
            },
            getDelegateKeyByOrchestrator: async ( orchestratorAddress: string ) => {
                return  queryService.GetDelegateKeyByOrchestrator({orchestratorAddress}) 
            },
            getPendingSendToEth: async ( senderAddress: string ) => {
                return  queryService.GetPendingSendToEth({senderAddress})
            },
        }
    }
}

