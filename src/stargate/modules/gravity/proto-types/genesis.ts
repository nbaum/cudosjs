/* eslint-disable */
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import Long from "long";
import { Valset, ERC20ToDenom } from "./types";
import { MsgValsetConfirm, MsgConfirmBatch, MsgConfirmLogicCall, MsgSetOrchestratorAddress } from "./msgs";
import { OutgoingTxBatch, OutgoingLogicCall, OutgoingTransferTx } from "./batch";
import { Attestation } from "./attestation";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "gravity.v1";

/**
 * The slashing fractions for the various gravity related slashing conditions. The first three
 * refer to not submitting a particular message, the third for submitting a different claim
 * for the same Ethereum event
 *
 * unbond_slashing_valsets_window
 *
 * The unbond slashing valsets window is used to determine how many blocks after starting to unbond
 * a validator needs to continue signing blocks. The goal of this paramater is that when a validator leaves
 * the set, if their leaving creates enough change in the validator set to justify an update they will sign
 * a validator set update for the Ethereum bridge that does not include themselves. Allowing us to remove them
 * from the Ethereum bridge and replace them with the new set gracefully.
 *
 * valset_reward
 *
 * Valset rewards are the amount of tokens this chain issues to relayers of validator sets.
 * These can be any ERC20 token in the bridge, but it's strongly advised that chains use only
 * Cosmos originated tokens, which the bridge effectively mints on Ethereum. If you run out of
 * the token you are using for validator set rewards valset updates will fail and the bridge
 * will be vulnerable to highjacking. For these paramaters the zero values are special and indicate
 * not to attempt any reward. This is the default for bootstrapping.
 */
export interface Params {
  gravityId: string;
  minimumTransferToEth: string;
  minimumFeeTransferToEth: string;
  contractSourceHash: string;
  bridgeEthereumAddress: string;
  bridgeChainId: Long;
  signedValsetsWindow: Long;
  signedBatchesWindow: Long;
  signedLogicCallsWindow: Long;
  targetBatchTimeout: Long;
  averageBlockTime: Long;
  averageEthereumBlockTime: Long;
  slashFractionValset: Uint8Array;
  slashFractionBatch: Uint8Array;
  slashFractionLogicCall: Uint8Array;
  unbondSlashingValsetsWindow: Long;
  slashFractionBadEthSignature: Uint8Array;
  valsetReward?: Coin;
}

/** GenesisState struct */
export interface GenesisState {
  params?: Params;
  lastObservedNonce: Long;
  valsets: Valset[];
  valsetConfirms: MsgValsetConfirm[];
  batches: OutgoingTxBatch[];
  batchConfirms: MsgConfirmBatch[];
  logicCalls: OutgoingLogicCall[];
  logicCallConfirms: MsgConfirmLogicCall[];
  attestations: Attestation[];
  delegateKeys: MsgSetOrchestratorAddress[];
  erc20ToDenoms: ERC20ToDenom[];
  unbatchedTransfers: OutgoingTransferTx[];
  lastTxPoolId: Long;
  lastOutgoingBatchId: Long;
  lastSlashedLogicCallBlock: Long;
  lastSlashedBatchedBlock: Long;
  lastSlashedValsetNonce: Long;
  lastUnBondingBlockHeight: Long;
  lastLatestValsetNonce: Long;
  staticValCosmosAddrs: string[];
}

function createBaseParams(): Params {
  return {
    gravityId: "",
    minimumTransferToEth: "",
    minimumFeeTransferToEth: "",
    contractSourceHash: "",
    bridgeEthereumAddress: "",
    bridgeChainId: Long.UZERO,
    signedValsetsWindow: Long.UZERO,
    signedBatchesWindow: Long.UZERO,
    signedLogicCallsWindow: Long.UZERO,
    targetBatchTimeout: Long.UZERO,
    averageBlockTime: Long.UZERO,
    averageEthereumBlockTime: Long.UZERO,
    slashFractionValset: new Uint8Array(),
    slashFractionBatch: new Uint8Array(),
    slashFractionLogicCall: new Uint8Array(),
    unbondSlashingValsetsWindow: Long.UZERO,
    slashFractionBadEthSignature: new Uint8Array(),
    valsetReward: undefined,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gravityId !== "") {
      writer.uint32(10).string(message.gravityId);
    }
    if (message.minimumTransferToEth !== "") {
      writer.uint32(18).string(message.minimumTransferToEth);
    }
    if (message.minimumFeeTransferToEth !== "") {
      writer.uint32(26).string(message.minimumFeeTransferToEth);
    }
    if (message.contractSourceHash !== "") {
      writer.uint32(34).string(message.contractSourceHash);
    }
    if (message.bridgeEthereumAddress !== "") {
      writer.uint32(42).string(message.bridgeEthereumAddress);
    }
    if (!message.bridgeChainId.isZero()) {
      writer.uint32(48).uint64(message.bridgeChainId);
    }
    if (!message.signedValsetsWindow.isZero()) {
      writer.uint32(56).uint64(message.signedValsetsWindow);
    }
    if (!message.signedBatchesWindow.isZero()) {
      writer.uint32(64).uint64(message.signedBatchesWindow);
    }
    if (!message.signedLogicCallsWindow.isZero()) {
      writer.uint32(72).uint64(message.signedLogicCallsWindow);
    }
    if (!message.targetBatchTimeout.isZero()) {
      writer.uint32(80).uint64(message.targetBatchTimeout);
    }
    if (!message.averageBlockTime.isZero()) {
      writer.uint32(88).uint64(message.averageBlockTime);
    }
    if (!message.averageEthereumBlockTime.isZero()) {
      writer.uint32(96).uint64(message.averageEthereumBlockTime);
    }
    if (message.slashFractionValset.length !== 0) {
      writer.uint32(106).bytes(message.slashFractionValset);
    }
    if (message.slashFractionBatch.length !== 0) {
      writer.uint32(114).bytes(message.slashFractionBatch);
    }
    if (message.slashFractionLogicCall.length !== 0) {
      writer.uint32(122).bytes(message.slashFractionLogicCall);
    }
    if (!message.unbondSlashingValsetsWindow.isZero()) {
      writer.uint32(128).uint64(message.unbondSlashingValsetsWindow);
    }
    if (message.slashFractionBadEthSignature.length !== 0) {
      writer.uint32(138).bytes(message.slashFractionBadEthSignature);
    }
    if (message.valsetReward !== undefined) {
      Coin.encode(message.valsetReward, writer.uint32(146).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gravityId = reader.string();
          break;
        case 2:
          message.minimumTransferToEth = reader.string();
          break;
        case 3:
          message.minimumFeeTransferToEth = reader.string();
          break;
        case 4:
          message.contractSourceHash = reader.string();
          break;
        case 5:
          message.bridgeEthereumAddress = reader.string();
          break;
        case 6:
          message.bridgeChainId = reader.uint64() as Long;
          break;
        case 7:
          message.signedValsetsWindow = reader.uint64() as Long;
          break;
        case 8:
          message.signedBatchesWindow = reader.uint64() as Long;
          break;
        case 9:
          message.signedLogicCallsWindow = reader.uint64() as Long;
          break;
        case 10:
          message.targetBatchTimeout = reader.uint64() as Long;
          break;
        case 11:
          message.averageBlockTime = reader.uint64() as Long;
          break;
        case 12:
          message.averageEthereumBlockTime = reader.uint64() as Long;
          break;
        case 13:
          message.slashFractionValset = reader.bytes();
          break;
        case 14:
          message.slashFractionBatch = reader.bytes();
          break;
        case 15:
          message.slashFractionLogicCall = reader.bytes();
          break;
        case 16:
          message.unbondSlashingValsetsWindow = reader.uint64() as Long;
          break;
        case 17:
          message.slashFractionBadEthSignature = reader.bytes();
          break;
        case 18:
          message.valsetReward = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      gravityId: isSet(object.gravityId) ? String(object.gravityId) : "",
      minimumTransferToEth: isSet(object.minimumTransferToEth) ? String(object.minimumTransferToEth) : "",
      minimumFeeTransferToEth: isSet(object.minimumFeeTransferToEth)
        ? String(object.minimumFeeTransferToEth)
        : "",
      contractSourceHash: isSet(object.contractSourceHash) ? String(object.contractSourceHash) : "",
      bridgeEthereumAddress: isSet(object.bridgeEthereumAddress) ? String(object.bridgeEthereumAddress) : "",
      bridgeChainId: isSet(object.bridgeChainId) ? Long.fromValue(object.bridgeChainId) : Long.UZERO,
      signedValsetsWindow: isSet(object.signedValsetsWindow)
        ? Long.fromValue(object.signedValsetsWindow)
        : Long.UZERO,
      signedBatchesWindow: isSet(object.signedBatchesWindow)
        ? Long.fromValue(object.signedBatchesWindow)
        : Long.UZERO,
      signedLogicCallsWindow: isSet(object.signedLogicCallsWindow)
        ? Long.fromValue(object.signedLogicCallsWindow)
        : Long.UZERO,
      targetBatchTimeout: isSet(object.targetBatchTimeout)
        ? Long.fromValue(object.targetBatchTimeout)
        : Long.UZERO,
      averageBlockTime: isSet(object.averageBlockTime) ? Long.fromValue(object.averageBlockTime) : Long.UZERO,
      averageEthereumBlockTime: isSet(object.averageEthereumBlockTime)
        ? Long.fromValue(object.averageEthereumBlockTime)
        : Long.UZERO,
      slashFractionValset: isSet(object.slashFractionValset)
        ? bytesFromBase64(object.slashFractionValset)
        : new Uint8Array(),
      slashFractionBatch: isSet(object.slashFractionBatch)
        ? bytesFromBase64(object.slashFractionBatch)
        : new Uint8Array(),
      slashFractionLogicCall: isSet(object.slashFractionLogicCall)
        ? bytesFromBase64(object.slashFractionLogicCall)
        : new Uint8Array(),
      unbondSlashingValsetsWindow: isSet(object.unbondSlashingValsetsWindow)
        ? Long.fromValue(object.unbondSlashingValsetsWindow)
        : Long.UZERO,
      slashFractionBadEthSignature: isSet(object.slashFractionBadEthSignature)
        ? bytesFromBase64(object.slashFractionBadEthSignature)
        : new Uint8Array(),
      valsetReward: isSet(object.valsetReward) ? Coin.fromJSON(object.valsetReward) : undefined,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.gravityId !== undefined && (obj.gravityId = message.gravityId);
    message.minimumTransferToEth !== undefined && (obj.minimumTransferToEth = message.minimumTransferToEth);
    message.minimumFeeTransferToEth !== undefined &&
      (obj.minimumFeeTransferToEth = message.minimumFeeTransferToEth);
    message.contractSourceHash !== undefined && (obj.contractSourceHash = message.contractSourceHash);
    message.bridgeEthereumAddress !== undefined &&
      (obj.bridgeEthereumAddress = message.bridgeEthereumAddress);
    message.bridgeChainId !== undefined &&
      (obj.bridgeChainId = (message.bridgeChainId || Long.UZERO).toString());
    message.signedValsetsWindow !== undefined &&
      (obj.signedValsetsWindow = (message.signedValsetsWindow || Long.UZERO).toString());
    message.signedBatchesWindow !== undefined &&
      (obj.signedBatchesWindow = (message.signedBatchesWindow || Long.UZERO).toString());
    message.signedLogicCallsWindow !== undefined &&
      (obj.signedLogicCallsWindow = (message.signedLogicCallsWindow || Long.UZERO).toString());
    message.targetBatchTimeout !== undefined &&
      (obj.targetBatchTimeout = (message.targetBatchTimeout || Long.UZERO).toString());
    message.averageBlockTime !== undefined &&
      (obj.averageBlockTime = (message.averageBlockTime || Long.UZERO).toString());
    message.averageEthereumBlockTime !== undefined &&
      (obj.averageEthereumBlockTime = (message.averageEthereumBlockTime || Long.UZERO).toString());
    message.slashFractionValset !== undefined &&
      (obj.slashFractionValset = base64FromBytes(
        message.slashFractionValset !== undefined ? message.slashFractionValset : new Uint8Array(),
      ));
    message.slashFractionBatch !== undefined &&
      (obj.slashFractionBatch = base64FromBytes(
        message.slashFractionBatch !== undefined ? message.slashFractionBatch : new Uint8Array(),
      ));
    message.slashFractionLogicCall !== undefined &&
      (obj.slashFractionLogicCall = base64FromBytes(
        message.slashFractionLogicCall !== undefined ? message.slashFractionLogicCall : new Uint8Array(),
      ));
    message.unbondSlashingValsetsWindow !== undefined &&
      (obj.unbondSlashingValsetsWindow = (message.unbondSlashingValsetsWindow || Long.UZERO).toString());
    message.slashFractionBadEthSignature !== undefined &&
      (obj.slashFractionBadEthSignature = base64FromBytes(
        message.slashFractionBadEthSignature !== undefined
          ? message.slashFractionBadEthSignature
          : new Uint8Array(),
      ));
    message.valsetReward !== undefined &&
      (obj.valsetReward = message.valsetReward ? Coin.toJSON(message.valsetReward) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.gravityId = object.gravityId ?? "";
    message.minimumTransferToEth = object.minimumTransferToEth ?? "";
    message.minimumFeeTransferToEth = object.minimumFeeTransferToEth ?? "";
    message.contractSourceHash = object.contractSourceHash ?? "";
    message.bridgeEthereumAddress = object.bridgeEthereumAddress ?? "";
    message.bridgeChainId =
      object.bridgeChainId !== undefined && object.bridgeChainId !== null
        ? Long.fromValue(object.bridgeChainId)
        : Long.UZERO;
    message.signedValsetsWindow =
      object.signedValsetsWindow !== undefined && object.signedValsetsWindow !== null
        ? Long.fromValue(object.signedValsetsWindow)
        : Long.UZERO;
    message.signedBatchesWindow =
      object.signedBatchesWindow !== undefined && object.signedBatchesWindow !== null
        ? Long.fromValue(object.signedBatchesWindow)
        : Long.UZERO;
    message.signedLogicCallsWindow =
      object.signedLogicCallsWindow !== undefined && object.signedLogicCallsWindow !== null
        ? Long.fromValue(object.signedLogicCallsWindow)
        : Long.UZERO;
    message.targetBatchTimeout =
      object.targetBatchTimeout !== undefined && object.targetBatchTimeout !== null
        ? Long.fromValue(object.targetBatchTimeout)
        : Long.UZERO;
    message.averageBlockTime =
      object.averageBlockTime !== undefined && object.averageBlockTime !== null
        ? Long.fromValue(object.averageBlockTime)
        : Long.UZERO;
    message.averageEthereumBlockTime =
      object.averageEthereumBlockTime !== undefined && object.averageEthereumBlockTime !== null
        ? Long.fromValue(object.averageEthereumBlockTime)
        : Long.UZERO;
    message.slashFractionValset = object.slashFractionValset ?? new Uint8Array();
    message.slashFractionBatch = object.slashFractionBatch ?? new Uint8Array();
    message.slashFractionLogicCall = object.slashFractionLogicCall ?? new Uint8Array();
    message.unbondSlashingValsetsWindow =
      object.unbondSlashingValsetsWindow !== undefined && object.unbondSlashingValsetsWindow !== null
        ? Long.fromValue(object.unbondSlashingValsetsWindow)
        : Long.UZERO;
    message.slashFractionBadEthSignature = object.slashFractionBadEthSignature ?? new Uint8Array();
    message.valsetReward =
      object.valsetReward !== undefined && object.valsetReward !== null
        ? Coin.fromPartial(object.valsetReward)
        : undefined;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    lastObservedNonce: Long.UZERO,
    valsets: [],
    valsetConfirms: [],
    batches: [],
    batchConfirms: [],
    logicCalls: [],
    logicCallConfirms: [],
    attestations: [],
    delegateKeys: [],
    erc20ToDenoms: [],
    unbatchedTransfers: [],
    lastTxPoolId: Long.UZERO,
    lastOutgoingBatchId: Long.UZERO,
    lastSlashedLogicCallBlock: Long.UZERO,
    lastSlashedBatchedBlock: Long.UZERO,
    lastSlashedValsetNonce: Long.UZERO,
    lastUnBondingBlockHeight: Long.UZERO,
    lastLatestValsetNonce: Long.UZERO,
    staticValCosmosAddrs: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (!message.lastObservedNonce.isZero()) {
      writer.uint32(16).uint64(message.lastObservedNonce);
    }
    for (const v of message.valsets) {
      Valset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.valsetConfirms) {
      MsgValsetConfirm.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.batches) {
      OutgoingTxBatch.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.batchConfirms) {
      MsgConfirmBatch.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.logicCalls) {
      OutgoingLogicCall.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.logicCallConfirms) {
      MsgConfirmLogicCall.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.attestations) {
      Attestation.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.delegateKeys) {
      MsgSetOrchestratorAddress.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.erc20ToDenoms) {
      ERC20ToDenom.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.unbatchedTransfers) {
      OutgoingTransferTx.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (!message.lastTxPoolId.isZero()) {
      writer.uint32(104).uint64(message.lastTxPoolId);
    }
    if (!message.lastOutgoingBatchId.isZero()) {
      writer.uint32(112).uint64(message.lastOutgoingBatchId);
    }
    if (!message.lastSlashedLogicCallBlock.isZero()) {
      writer.uint32(120).uint64(message.lastSlashedLogicCallBlock);
    }
    if (!message.lastSlashedBatchedBlock.isZero()) {
      writer.uint32(128).uint64(message.lastSlashedBatchedBlock);
    }
    if (!message.lastSlashedValsetNonce.isZero()) {
      writer.uint32(136).uint64(message.lastSlashedValsetNonce);
    }
    if (!message.lastUnBondingBlockHeight.isZero()) {
      writer.uint32(144).uint64(message.lastUnBondingBlockHeight);
    }
    if (!message.lastLatestValsetNonce.isZero()) {
      writer.uint32(152).uint64(message.lastLatestValsetNonce);
    }
    for (const v of message.staticValCosmosAddrs) {
      writer.uint32(162).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.lastObservedNonce = reader.uint64() as Long;
          break;
        case 3:
          message.valsets.push(Valset.decode(reader, reader.uint32()));
          break;
        case 4:
          message.valsetConfirms.push(MsgValsetConfirm.decode(reader, reader.uint32()));
          break;
        case 5:
          message.batches.push(OutgoingTxBatch.decode(reader, reader.uint32()));
          break;
        case 6:
          message.batchConfirms.push(MsgConfirmBatch.decode(reader, reader.uint32()));
          break;
        case 7:
          message.logicCalls.push(OutgoingLogicCall.decode(reader, reader.uint32()));
          break;
        case 8:
          message.logicCallConfirms.push(MsgConfirmLogicCall.decode(reader, reader.uint32()));
          break;
        case 9:
          message.attestations.push(Attestation.decode(reader, reader.uint32()));
          break;
        case 10:
          message.delegateKeys.push(MsgSetOrchestratorAddress.decode(reader, reader.uint32()));
          break;
        case 11:
          message.erc20ToDenoms.push(ERC20ToDenom.decode(reader, reader.uint32()));
          break;
        case 12:
          message.unbatchedTransfers.push(OutgoingTransferTx.decode(reader, reader.uint32()));
          break;
        case 13:
          message.lastTxPoolId = reader.uint64() as Long;
          break;
        case 14:
          message.lastOutgoingBatchId = reader.uint64() as Long;
          break;
        case 15:
          message.lastSlashedLogicCallBlock = reader.uint64() as Long;
          break;
        case 16:
          message.lastSlashedBatchedBlock = reader.uint64() as Long;
          break;
        case 17:
          message.lastSlashedValsetNonce = reader.uint64() as Long;
          break;
        case 18:
          message.lastUnBondingBlockHeight = reader.uint64() as Long;
          break;
        case 19:
          message.lastLatestValsetNonce = reader.uint64() as Long;
          break;
        case 20:
          message.staticValCosmosAddrs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      lastObservedNonce: isSet(object.lastObservedNonce)
        ? Long.fromValue(object.lastObservedNonce)
        : Long.UZERO,
      valsets: Array.isArray(object?.valsets) ? object.valsets.map((e: any) => Valset.fromJSON(e)) : [],
      valsetConfirms: Array.isArray(object?.valsetConfirms)
        ? object.valsetConfirms.map((e: any) => MsgValsetConfirm.fromJSON(e))
        : [],
      batches: Array.isArray(object?.batches)
        ? object.batches.map((e: any) => OutgoingTxBatch.fromJSON(e))
        : [],
      batchConfirms: Array.isArray(object?.batchConfirms)
        ? object.batchConfirms.map((e: any) => MsgConfirmBatch.fromJSON(e))
        : [],
      logicCalls: Array.isArray(object?.logicCalls)
        ? object.logicCalls.map((e: any) => OutgoingLogicCall.fromJSON(e))
        : [],
      logicCallConfirms: Array.isArray(object?.logicCallConfirms)
        ? object.logicCallConfirms.map((e: any) => MsgConfirmLogicCall.fromJSON(e))
        : [],
      attestations: Array.isArray(object?.attestations)
        ? object.attestations.map((e: any) => Attestation.fromJSON(e))
        : [],
      delegateKeys: Array.isArray(object?.delegateKeys)
        ? object.delegateKeys.map((e: any) => MsgSetOrchestratorAddress.fromJSON(e))
        : [],
      erc20ToDenoms: Array.isArray(object?.erc20ToDenoms)
        ? object.erc20ToDenoms.map((e: any) => ERC20ToDenom.fromJSON(e))
        : [],
      unbatchedTransfers: Array.isArray(object?.unbatchedTransfers)
        ? object.unbatchedTransfers.map((e: any) => OutgoingTransferTx.fromJSON(e))
        : [],
      lastTxPoolId: isSet(object.lastTxPoolId) ? Long.fromValue(object.lastTxPoolId) : Long.UZERO,
      lastOutgoingBatchId: isSet(object.lastOutgoingBatchId)
        ? Long.fromValue(object.lastOutgoingBatchId)
        : Long.UZERO,
      lastSlashedLogicCallBlock: isSet(object.lastSlashedLogicCallBlock)
        ? Long.fromValue(object.lastSlashedLogicCallBlock)
        : Long.UZERO,
      lastSlashedBatchedBlock: isSet(object.lastSlashedBatchedBlock)
        ? Long.fromValue(object.lastSlashedBatchedBlock)
        : Long.UZERO,
      lastSlashedValsetNonce: isSet(object.lastSlashedValsetNonce)
        ? Long.fromValue(object.lastSlashedValsetNonce)
        : Long.UZERO,
      lastUnBondingBlockHeight: isSet(object.lastUnBondingBlockHeight)
        ? Long.fromValue(object.lastUnBondingBlockHeight)
        : Long.UZERO,
      lastLatestValsetNonce: isSet(object.lastLatestValsetNonce)
        ? Long.fromValue(object.lastLatestValsetNonce)
        : Long.UZERO,
      staticValCosmosAddrs: Array.isArray(object?.staticValCosmosAddrs)
        ? object.staticValCosmosAddrs.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.lastObservedNonce !== undefined &&
      (obj.lastObservedNonce = (message.lastObservedNonce || Long.UZERO).toString());
    if (message.valsets) {
      obj.valsets = message.valsets.map((e) => (e ? Valset.toJSON(e) : undefined));
    } else {
      obj.valsets = [];
    }
    if (message.valsetConfirms) {
      obj.valsetConfirms = message.valsetConfirms.map((e) => (e ? MsgValsetConfirm.toJSON(e) : undefined));
    } else {
      obj.valsetConfirms = [];
    }
    if (message.batches) {
      obj.batches = message.batches.map((e) => (e ? OutgoingTxBatch.toJSON(e) : undefined));
    } else {
      obj.batches = [];
    }
    if (message.batchConfirms) {
      obj.batchConfirms = message.batchConfirms.map((e) => (e ? MsgConfirmBatch.toJSON(e) : undefined));
    } else {
      obj.batchConfirms = [];
    }
    if (message.logicCalls) {
      obj.logicCalls = message.logicCalls.map((e) => (e ? OutgoingLogicCall.toJSON(e) : undefined));
    } else {
      obj.logicCalls = [];
    }
    if (message.logicCallConfirms) {
      obj.logicCallConfirms = message.logicCallConfirms.map((e) =>
        e ? MsgConfirmLogicCall.toJSON(e) : undefined,
      );
    } else {
      obj.logicCallConfirms = [];
    }
    if (message.attestations) {
      obj.attestations = message.attestations.map((e) => (e ? Attestation.toJSON(e) : undefined));
    } else {
      obj.attestations = [];
    }
    if (message.delegateKeys) {
      obj.delegateKeys = message.delegateKeys.map((e) =>
        e ? MsgSetOrchestratorAddress.toJSON(e) : undefined,
      );
    } else {
      obj.delegateKeys = [];
    }
    if (message.erc20ToDenoms) {
      obj.erc20ToDenoms = message.erc20ToDenoms.map((e) => (e ? ERC20ToDenom.toJSON(e) : undefined));
    } else {
      obj.erc20ToDenoms = [];
    }
    if (message.unbatchedTransfers) {
      obj.unbatchedTransfers = message.unbatchedTransfers.map((e) =>
        e ? OutgoingTransferTx.toJSON(e) : undefined,
      );
    } else {
      obj.unbatchedTransfers = [];
    }
    message.lastTxPoolId !== undefined &&
      (obj.lastTxPoolId = (message.lastTxPoolId || Long.UZERO).toString());
    message.lastOutgoingBatchId !== undefined &&
      (obj.lastOutgoingBatchId = (message.lastOutgoingBatchId || Long.UZERO).toString());
    message.lastSlashedLogicCallBlock !== undefined &&
      (obj.lastSlashedLogicCallBlock = (message.lastSlashedLogicCallBlock || Long.UZERO).toString());
    message.lastSlashedBatchedBlock !== undefined &&
      (obj.lastSlashedBatchedBlock = (message.lastSlashedBatchedBlock || Long.UZERO).toString());
    message.lastSlashedValsetNonce !== undefined &&
      (obj.lastSlashedValsetNonce = (message.lastSlashedValsetNonce || Long.UZERO).toString());
    message.lastUnBondingBlockHeight !== undefined &&
      (obj.lastUnBondingBlockHeight = (message.lastUnBondingBlockHeight || Long.UZERO).toString());
    message.lastLatestValsetNonce !== undefined &&
      (obj.lastLatestValsetNonce = (message.lastLatestValsetNonce || Long.UZERO).toString());
    if (message.staticValCosmosAddrs) {
      obj.staticValCosmosAddrs = message.staticValCosmosAddrs.map((e) => e);
    } else {
      obj.staticValCosmosAddrs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.lastObservedNonce =
      object.lastObservedNonce !== undefined && object.lastObservedNonce !== null
        ? Long.fromValue(object.lastObservedNonce)
        : Long.UZERO;
    message.valsets = object.valsets?.map((e) => Valset.fromPartial(e)) || [];
    message.valsetConfirms = object.valsetConfirms?.map((e) => MsgValsetConfirm.fromPartial(e)) || [];
    message.batches = object.batches?.map((e) => OutgoingTxBatch.fromPartial(e)) || [];
    message.batchConfirms = object.batchConfirms?.map((e) => MsgConfirmBatch.fromPartial(e)) || [];
    message.logicCalls = object.logicCalls?.map((e) => OutgoingLogicCall.fromPartial(e)) || [];
    message.logicCallConfirms =
      object.logicCallConfirms?.map((e) => MsgConfirmLogicCall.fromPartial(e)) || [];
    message.attestations = object.attestations?.map((e) => Attestation.fromPartial(e)) || [];
    message.delegateKeys = object.delegateKeys?.map((e) => MsgSetOrchestratorAddress.fromPartial(e)) || [];
    message.erc20ToDenoms = object.erc20ToDenoms?.map((e) => ERC20ToDenom.fromPartial(e)) || [];
    message.unbatchedTransfers =
      object.unbatchedTransfers?.map((e) => OutgoingTransferTx.fromPartial(e)) || [];
    message.lastTxPoolId =
      object.lastTxPoolId !== undefined && object.lastTxPoolId !== null
        ? Long.fromValue(object.lastTxPoolId)
        : Long.UZERO;
    message.lastOutgoingBatchId =
      object.lastOutgoingBatchId !== undefined && object.lastOutgoingBatchId !== null
        ? Long.fromValue(object.lastOutgoingBatchId)
        : Long.UZERO;
    message.lastSlashedLogicCallBlock =
      object.lastSlashedLogicCallBlock !== undefined && object.lastSlashedLogicCallBlock !== null
        ? Long.fromValue(object.lastSlashedLogicCallBlock)
        : Long.UZERO;
    message.lastSlashedBatchedBlock =
      object.lastSlashedBatchedBlock !== undefined && object.lastSlashedBatchedBlock !== null
        ? Long.fromValue(object.lastSlashedBatchedBlock)
        : Long.UZERO;
    message.lastSlashedValsetNonce =
      object.lastSlashedValsetNonce !== undefined && object.lastSlashedValsetNonce !== null
        ? Long.fromValue(object.lastSlashedValsetNonce)
        : Long.UZERO;
    message.lastUnBondingBlockHeight =
      object.lastUnBondingBlockHeight !== undefined && object.lastUnBondingBlockHeight !== null
        ? Long.fromValue(object.lastUnBondingBlockHeight)
        : Long.UZERO;
    message.lastLatestValsetNonce =
      object.lastLatestValsetNonce !== undefined && object.lastLatestValsetNonce !== null
        ? Long.fromValue(object.lastLatestValsetNonce)
        : Long.UZERO;
    message.staticValCosmosAddrs = object.staticValCosmosAddrs?.map((e) => e) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
