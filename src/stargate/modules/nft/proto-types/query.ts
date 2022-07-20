/* eslint-disable */
import { PageRequest, PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { Owner, Collection, Denom, BaseNFT } from "./nft";
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cudosnode.cudosnode.nft";

/** QuerySupplyRequest is the request type for the Query/HTLC RPC method */
export interface QuerySupplyRequest {
  denomId: string;
  owner: string;
}

/** QuerySupplyResponse is the response type for the Query/Supply RPC method */
export interface QuerySupplyResponse {
  /** DO NOT TOUCH Please, or zero values for amount will broke when Marshalled! */
  amount: Long;
}

/** QueryOwnerRequest is the request type for the Query/Owner RPC method */
export interface QueryOwnerRequest {
  denomId: string;
  owner: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryOwnerResponse is the response type for the Query/Owner RPC method */
export interface QueryOwnerResponse {
  owner?: Owner;
  pagination?: PageResponse;
}

/** QueryCollectionRequest is the request type for the Query/Collection RPC method */
export interface QueryCollectionRequest {
  denomId: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryCollectionResponse is the response type for the Query/Collection RPC method */
export interface QueryCollectionResponse {
  collection?: Collection;
  pagination?: PageResponse;
}

/** QueryDenomRequest is the request type for the Query/Denom RPC method */
export interface QueryDenomRequest {
  denomId: string;
}

/** QueryDenomResponse is the response type for the Query/Denom RPC method */
export interface QueryDenomResponse {
  denom?: Denom;
}

/** QueryDenomByNameRequest is the request type for the Query/DenomByName RPC method */
export interface QueryDenomByNameRequest {
  denomName: string;
}

/** QueryDenomBySymbolRequest is the request type for the Query/DenomBySymbol RPC method */
export interface QueryDenomBySymbolRequest {
  symbol: string;
}

/** QueryDenomByNameResponse is the response type for the Query/DenomByName RPC method */
export interface QueryDenomByNameResponse {
  denom?: Denom;
}

/** QueryDenomByNameResponse is the response type for the Query/DenomByName RPC method */
export interface QueryDenomBySymbolResponse {
  denom?: Denom;
}

/** QueryDenomsRequest is the request type for the Query/Denoms RPC method */
export interface QueryDenomsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryDenomsResponse is the response type for the Query/Denoms RPC method */
export interface QueryDenomsResponse {
  denoms: Denom[];
  pagination?: PageResponse;
}

/** QueryNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryNFTRequest {
  denomId: string;
  tokenId: string;
}

/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface QueryNFTResponse {
  nft?: BaseNFT;
}

/** QueryApprovalsNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryApprovalsNFTRequest {
  denomId: string;
  tokenId: string;
}

/** QueryApprovalsNFTResponse is the response type for the Query/ApprovalsNFTRequest RPC method */
export interface QueryApprovalsNFTResponse {
  ApprovedAddresses: string[];
}

/** QueryApprovalsIsApprovedForAllRequest is the request type for the Query/NFT RPC method */
export interface QueryApprovalsIsApprovedForAllRequest {
  owner: string;
  operator: string;
}

/** QueryApprovalsNFTResponse is the response type for the Query/ApprovalsNFTRequest RPC method */
export interface QueryApprovalsIsApprovedForAllResponse {
  isApproved: boolean;
}

function createBaseQuerySupplyRequest(): QuerySupplyRequest {
  return { denomId: "", owner: "" };
}

export const QuerySupplyRequest = {
  encode(message: QuerySupplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: QuerySupplyRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySupplyRequest>, I>>(object: I): QuerySupplyRequest {
    const message = createBaseQuerySupplyRequest();
    message.denomId = object.denomId ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQuerySupplyResponse(): QuerySupplyResponse {
  return { amount: Long.UZERO };
}

export const QuerySupplyResponse = {
  encode(message: QuerySupplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyResponse {
    return {
      amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO,
    };
  },

  toJSON(message: QuerySupplyResponse): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySupplyResponse>, I>>(object: I): QuerySupplyResponse {
    const message = createBaseQuerySupplyResponse();
    message.amount =
      object.amount !== undefined && object.amount !== null ? Long.fromValue(object.amount) : Long.UZERO;
    return message;
  },
};

function createBaseQueryOwnerRequest(): QueryOwnerRequest {
  return { denomId: "", owner: "", pagination: undefined };
}

export const QueryOwnerRequest = {
  encode(message: QueryOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryOwnerRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryOwnerRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOwnerRequest>, I>>(object: I): QueryOwnerRequest {
    const message = createBaseQueryOwnerRequest();
    message.denomId = object.denomId ?? "";
    message.owner = object.owner ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryOwnerResponse(): QueryOwnerResponse {
  return { owner: undefined, pagination: undefined };
}

export const QueryOwnerResponse = {
  encode(message: QueryOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== undefined) {
      Owner.encode(message.owner, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = Owner.decode(reader, reader.uint32());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryOwnerResponse {
    return {
      owner: isSet(object.owner) ? Owner.fromJSON(object.owner) : undefined,
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryOwnerResponse): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner ? Owner.toJSON(message.owner) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOwnerResponse>, I>>(object: I): QueryOwnerResponse {
    const message = createBaseQueryOwnerResponse();
    message.owner =
      object.owner !== undefined && object.owner !== null ? Owner.fromPartial(object.owner) : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryCollectionRequest(): QueryCollectionRequest {
  return { denomId: "", pagination: undefined };
}

export const QueryCollectionRequest = {
  encode(message: QueryCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionRequest>, I>>(object: I): QueryCollectionRequest {
    const message = createBaseQueryCollectionRequest();
    message.denomId = object.denomId ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryCollectionResponse(): QueryCollectionResponse {
  return { collection: undefined, pagination: undefined };
}

export const QueryCollectionResponse = {
  encode(message: QueryCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = Collection.decode(reader, reader.uint32());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionResponse {
    return {
      collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionResponse): unknown {
    const obj: any = {};
    message.collection !== undefined &&
      (obj.collection = message.collection ? Collection.toJSON(message.collection) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionResponse>, I>>(object: I): QueryCollectionResponse {
    const message = createBaseQueryCollectionResponse();
    message.collection =
      object.collection !== undefined && object.collection !== null
        ? Collection.fromPartial(object.collection)
        : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomRequest(): QueryDenomRequest {
  return { denomId: "" };
}

export const QueryDenomRequest = {
  encode(message: QueryDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
    };
  },

  toJSON(message: QueryDenomRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(object: I): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    message.denomId = object.denomId ?? "";
    return message;
  },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
  return { denom: undefined };
}

export const QueryDenomResponse = {
  encode(message: QueryDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomResponse {
    return {
      denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined,
    };
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(object: I): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom =
      object.denom !== undefined && object.denom !== null ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryDenomByNameRequest(): QueryDenomByNameRequest {
  return { denomName: "" };
}

export const QueryDenomByNameRequest = {
  encode(message: QueryDenomByNameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomName !== "") {
      writer.uint32(10).string(message.denomName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomByNameRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomByNameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomByNameRequest {
    return {
      denomName: isSet(object.denomName) ? String(object.denomName) : "",
    };
  },

  toJSON(message: QueryDenomByNameRequest): unknown {
    const obj: any = {};
    message.denomName !== undefined && (obj.denomName = message.denomName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomByNameRequest>, I>>(object: I): QueryDenomByNameRequest {
    const message = createBaseQueryDenomByNameRequest();
    message.denomName = object.denomName ?? "";
    return message;
  },
};

function createBaseQueryDenomBySymbolRequest(): QueryDenomBySymbolRequest {
  return { symbol: "" };
}

export const QueryDenomBySymbolRequest = {
  encode(message: QueryDenomBySymbolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.symbol !== "") {
      writer.uint32(10).string(message.symbol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomBySymbolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomBySymbolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomBySymbolRequest {
    return {
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
    };
  },

  toJSON(message: QueryDenomBySymbolRequest): unknown {
    const obj: any = {};
    message.symbol !== undefined && (obj.symbol = message.symbol);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomBySymbolRequest>, I>>(
    object: I,
  ): QueryDenomBySymbolRequest {
    const message = createBaseQueryDenomBySymbolRequest();
    message.symbol = object.symbol ?? "";
    return message;
  },
};

function createBaseQueryDenomByNameResponse(): QueryDenomByNameResponse {
  return { denom: undefined };
}

export const QueryDenomByNameResponse = {
  encode(message: QueryDenomByNameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomByNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomByNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomByNameResponse {
    return {
      denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined,
    };
  },

  toJSON(message: QueryDenomByNameResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomByNameResponse>, I>>(
    object: I,
  ): QueryDenomByNameResponse {
    const message = createBaseQueryDenomByNameResponse();
    message.denom =
      object.denom !== undefined && object.denom !== null ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryDenomBySymbolResponse(): QueryDenomBySymbolResponse {
  return { denom: undefined };
}

export const QueryDenomBySymbolResponse = {
  encode(message: QueryDenomBySymbolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomBySymbolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomBySymbolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomBySymbolResponse {
    return {
      denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined,
    };
  },

  toJSON(message: QueryDenomBySymbolResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomBySymbolResponse>, I>>(
    object: I,
  ): QueryDenomBySymbolResponse {
    const message = createBaseQueryDenomBySymbolResponse();
    message.denom =
      object.denom !== undefined && object.denom !== null ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryDenomsRequest(): QueryDenomsRequest {
  return { pagination: undefined };
}

export const QueryDenomsRequest = {
  encode(message: QueryDenomsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsRequest {
    return {
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(object: I): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryDenomsResponse(): QueryDenomsResponse {
  return { denoms: [], pagination: undefined };
}

export const QueryDenomsResponse = {
  encode(message: QueryDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(Denom.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsResponse {
    return {
      denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomsResponse): unknown {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map((e) => (e ? Denom.toJSON(e) : undefined));
    } else {
      obj.denoms = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(object: I): QueryDenomsResponse {
    const message = createBaseQueryDenomsResponse();
    message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryNFTRequest(): QueryNFTRequest {
  return { denomId: "", tokenId: "" };
}

export const QueryNFTRequest = {
  encode(message: QueryNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(18).string(message.tokenId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.tokenId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNFTRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
    };
  },

  toJSON(message: QueryNFTRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTRequest>, I>>(object: I): QueryNFTRequest {
    const message = createBaseQueryNFTRequest();
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    return message;
  },
};

function createBaseQueryNFTResponse(): QueryNFTResponse {
  return { nft: undefined };
}

export const QueryNFTResponse = {
  encode(message: QueryNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nft !== undefined) {
      BaseNFT.encode(message.nft, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nft = BaseNFT.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNFTResponse {
    return {
      nft: isSet(object.nft) ? BaseNFT.fromJSON(object.nft) : undefined,
    };
  },

  toJSON(message: QueryNFTResponse): unknown {
    const obj: any = {};
    message.nft !== undefined && (obj.nft = message.nft ? BaseNFT.toJSON(message.nft) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTResponse>, I>>(object: I): QueryNFTResponse {
    const message = createBaseQueryNFTResponse();
    message.nft =
      object.nft !== undefined && object.nft !== null ? BaseNFT.fromPartial(object.nft) : undefined;
    return message;
  },
};

function createBaseQueryApprovalsNFTRequest(): QueryApprovalsNFTRequest {
  return { denomId: "", tokenId: "" };
}

export const QueryApprovalsNFTRequest = {
  encode(message: QueryApprovalsNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(18).string(message.tokenId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryApprovalsNFTRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryApprovalsNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.tokenId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryApprovalsNFTRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
    };
  },

  toJSON(message: QueryApprovalsNFTRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryApprovalsNFTRequest>, I>>(
    object: I,
  ): QueryApprovalsNFTRequest {
    const message = createBaseQueryApprovalsNFTRequest();
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    return message;
  },
};

function createBaseQueryApprovalsNFTResponse(): QueryApprovalsNFTResponse {
  return { ApprovedAddresses: [] };
}

export const QueryApprovalsNFTResponse = {
  encode(message: QueryApprovalsNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ApprovedAddresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryApprovalsNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryApprovalsNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ApprovedAddresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryApprovalsNFTResponse {
    return {
      ApprovedAddresses: Array.isArray(object?.ApprovedAddresses)
        ? object.ApprovedAddresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: QueryApprovalsNFTResponse): unknown {
    const obj: any = {};
    if (message.ApprovedAddresses) {
      obj.ApprovedAddresses = message.ApprovedAddresses.map((e) => e);
    } else {
      obj.ApprovedAddresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryApprovalsNFTResponse>, I>>(
    object: I,
  ): QueryApprovalsNFTResponse {
    const message = createBaseQueryApprovalsNFTResponse();
    message.ApprovedAddresses = object.ApprovedAddresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryApprovalsIsApprovedForAllRequest(): QueryApprovalsIsApprovedForAllRequest {
  return { owner: "", operator: "" };
}

export const QueryApprovalsIsApprovedForAllRequest = {
  encode(
    message: QueryApprovalsIsApprovedForAllRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.operator !== "") {
      writer.uint32(18).string(message.operator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryApprovalsIsApprovedForAllRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryApprovalsIsApprovedForAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.operator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryApprovalsIsApprovedForAllRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      operator: isSet(object.operator) ? String(object.operator) : "",
    };
  },

  toJSON(message: QueryApprovalsIsApprovedForAllRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    message.operator !== undefined && (obj.operator = message.operator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryApprovalsIsApprovedForAllRequest>, I>>(
    object: I,
  ): QueryApprovalsIsApprovedForAllRequest {
    const message = createBaseQueryApprovalsIsApprovedForAllRequest();
    message.owner = object.owner ?? "";
    message.operator = object.operator ?? "";
    return message;
  },
};

function createBaseQueryApprovalsIsApprovedForAllResponse(): QueryApprovalsIsApprovedForAllResponse {
  return { isApproved: false };
}

export const QueryApprovalsIsApprovedForAllResponse = {
  encode(
    message: QueryApprovalsIsApprovedForAllResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.isApproved === true) {
      writer.uint32(8).bool(message.isApproved);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryApprovalsIsApprovedForAllResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryApprovalsIsApprovedForAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isApproved = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryApprovalsIsApprovedForAllResponse {
    return {
      isApproved: isSet(object.isApproved) ? Boolean(object.isApproved) : false,
    };
  },

  toJSON(message: QueryApprovalsIsApprovedForAllResponse): unknown {
    const obj: any = {};
    message.isApproved !== undefined && (obj.isApproved = message.isApproved);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryApprovalsIsApprovedForAllResponse>, I>>(
    object: I,
  ): QueryApprovalsIsApprovedForAllResponse {
    const message = createBaseQueryApprovalsIsApprovedForAllResponse();
    message.isApproved = object.isApproved ?? false;
    return message;
  },
};

/** Query defines the gRPC querier service for NFT module */
export interface Query {
  /** Supply queries the total supply of a given denom or owner */
  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>;
  /** Owner queries the NFTs of the specified owner */
  Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse>;
  /** Collection queries the NFTs of the specified denom */
  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
  /** Denom queries the definition of a given denom */
  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
  /** DenomByName queries the definition of a given denom by name */
  DenomByName(request: QueryDenomByNameRequest): Promise<QueryDenomByNameResponse>;
  /** DenomByName queries the definition of a given denom by name */
  DenomBySymbol(request: QueryDenomBySymbolRequest): Promise<QueryDenomBySymbolResponse>;
  /** Denoms queries all the denoms */
  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
  /** NFT queries the NFT for the given denom and token ID */
  NFT(request: QueryNFTRequest): Promise<QueryNFTResponse>;
  /** NFT queries the NFT for the given denom and token ID */
  GetApprovalsNFT(request: QueryApprovalsNFTRequest): Promise<QueryApprovalsNFTResponse>;
  /** NFT queries the NFT for the given denom and token ID */
  QueryApprovalsIsApprovedForAll(
    request: QueryApprovalsIsApprovedForAllRequest,
  ): Promise<QueryApprovalsIsApprovedForAllResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Supply = this.Supply.bind(this);
    this.Owner = this.Owner.bind(this);
    this.Collection = this.Collection.bind(this);
    this.Denom = this.Denom.bind(this);
    this.DenomByName = this.DenomByName.bind(this);
    this.DenomBySymbol = this.DenomBySymbol.bind(this);
    this.Denoms = this.Denoms.bind(this);
    this.NFT = this.NFT.bind(this);
    this.GetApprovalsNFT = this.GetApprovalsNFT.bind(this);
    this.QueryApprovalsIsApprovedForAll = this.QueryApprovalsIsApprovedForAll.bind(this);
  }
  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
    const data = QuerySupplyRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "Supply", data);
    return promise.then((data) => QuerySupplyResponse.decode(new _m0.Reader(data)));
  }

  Owner(request: QueryOwnerRequest): Promise<QueryOwnerResponse> {
    const data = QueryOwnerRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "Owner", data);
    return promise.then((data) => QueryOwnerResponse.decode(new _m0.Reader(data)));
  }

  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse> {
    const data = QueryCollectionRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "Collection", data);
    return promise.then((data) => QueryCollectionResponse.decode(new _m0.Reader(data)));
  }

  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "Denom", data);
    return promise.then((data) => QueryDenomResponse.decode(new _m0.Reader(data)));
  }

  DenomByName(request: QueryDenomByNameRequest): Promise<QueryDenomByNameResponse> {
    const data = QueryDenomByNameRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "DenomByName", data);
    return promise.then((data) => QueryDenomByNameResponse.decode(new _m0.Reader(data)));
  }

  DenomBySymbol(request: QueryDenomBySymbolRequest): Promise<QueryDenomBySymbolResponse> {
    const data = QueryDenomBySymbolRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "DenomBySymbol", data);
    return promise.then((data) => QueryDenomBySymbolResponse.decode(new _m0.Reader(data)));
  }

  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "Denoms", data);
    return promise.then((data) => QueryDenomsResponse.decode(new _m0.Reader(data)));
  }

  NFT(request: QueryNFTRequest): Promise<QueryNFTResponse> {
    const data = QueryNFTRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "NFT", data);
    return promise.then((data) => QueryNFTResponse.decode(new _m0.Reader(data)));
  }

  GetApprovalsNFT(request: QueryApprovalsNFTRequest): Promise<QueryApprovalsNFTResponse> {
    const data = QueryApprovalsNFTRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "GetApprovalsNFT", data);
    return promise.then((data) => QueryApprovalsNFTResponse.decode(new _m0.Reader(data)));
  }

  QueryApprovalsIsApprovedForAll(
    request: QueryApprovalsIsApprovedForAllRequest,
  ): Promise<QueryApprovalsIsApprovedForAllResponse> {
    const data = QueryApprovalsIsApprovedForAllRequest.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Query", "QueryApprovalsIsApprovedForAll", data);
    return promise.then((data) => QueryApprovalsIsApprovedForAllResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
