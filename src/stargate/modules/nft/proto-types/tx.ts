/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cudosnode.cudosnode.nft";

/** MsgIssueDenom defines an SDK message for creating a new denom. */
export interface MsgIssueDenom {
  id: string;
  name: string;
  schema: string;
  sender: string;
  contractAddressSigner: string;
  symbol: string;
}

/** MsgIssueDenomResponse defines the Msg/IssueDenom response type. */
export interface MsgIssueDenomResponse {}

/** MsgTransferNft defines an SDK message for transferring an NFT to recipient. */
export interface MsgTransferNft {
  denomId: string;
  tokenId: string;
  from: string;
  to: string;
  sender: string;
  contractAddressSigner: string;
}

/** MsgTransferNftResponse defines the Msg/TransferNft response type. */
export interface MsgTransferNftResponse {}

/** MsgApproveNft defines an SDK message for granted approval. */
export interface MsgApproveNft {
  id: string;
  denomId: string;
  sender: string;
  approvedAddress: string;
  contractAddressSigner: string;
}

/** MsgApproveNft defines the Msg/Approve response type. */
export interface MsgApproveNftResponse {}

export interface MsgApproveAllNft {
  operator: string;
  sender: string;
  approved: boolean;
  contractAddressSigner: string;
}

/** MsgApproveNft defines the Msg/Approve response type. */
export interface MsgApproveAllNftResponse {}

/** MsgRevokeNft defines an SDK message for revoking a previously granted permission to transfer the given an NFT. */
export interface MsgRevokeNft {
  addressToRevoke: string;
  denomId: string;
  tokenId: string;
  sender: string;
  contractAddressSigner: string;
}

/** MsgRevokeNftResponse defines the Msg/RevokeNft response type. */
export interface MsgRevokeNftResponse {}

/** MsgEditNFT defines an SDK message for editing a nft. */
export interface MsgEditNFT {
  id: string;
  denomId: string;
  name: string;
  uri: string;
  data: string;
  sender: string;
  contractAddressSigner: string;
}

/** MsgEditNFTResponse defines the Msg/EditNFT response type. */
export interface MsgEditNFTResponse {}

/** MsgMintNFT defines an SDK message for creating a new NFT. */
export interface MsgMintNFT {
  denomId: string;
  name: string;
  uri: string;
  data: string;
  sender: string;
  recipient: string;
  contractAddressSigner: string;
}

/** MsgMintNFTResponse defines the Msg/MintNFT response type. */
export interface MsgMintNFTResponse {}

/** MsgBurnNFT defines an SDK message for burning a NFT. */
export interface MsgBurnNFT {
  id: string;
  denomId: string;
  sender: string;
  contractAddressSigner: string;
}

/** MsgBurnNFTResponse defines the Msg/BurnNFT response type. */
export interface MsgBurnNFTResponse {}

function createBaseMsgIssueDenom(): MsgIssueDenom {
  return { id: "", name: "", schema: "", sender: "", contractAddressSigner: "", symbol: "" };
}

export const MsgIssueDenom = {
  encode(message: MsgIssueDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.schema !== "") {
      writer.uint32(26).string(message.schema);
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(42).string(message.contractAddressSigner);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueDenom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.schema = reader.string();
          break;
        case 4:
          message.sender = reader.string();
          break;
        case 5:
          message.contractAddressSigner = reader.string();
          break;
        case 6:
          message.symbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgIssueDenom {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      schema: isSet(object.schema) ? String(object.schema) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
    };
  },

  toJSON(message: MsgIssueDenom): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.schema !== undefined && (obj.schema = message.schema);
    message.sender !== undefined && (obj.sender = message.sender);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueDenom>, I>>(object: I): MsgIssueDenom {
    const message = createBaseMsgIssueDenom();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.schema = object.schema ?? "";
    message.sender = object.sender ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    message.symbol = object.symbol ?? "";
    return message;
  },
};

function createBaseMsgIssueDenomResponse(): MsgIssueDenomResponse {
  return {};
}

export const MsgIssueDenomResponse = {
  encode(_: MsgIssueDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgIssueDenomResponse {
    return {};
  },

  toJSON(_: MsgIssueDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueDenomResponse>, I>>(_: I): MsgIssueDenomResponse {
    const message = createBaseMsgIssueDenomResponse();
    return message;
  },
};

function createBaseMsgTransferNft(): MsgTransferNft {
  return { denomId: "", tokenId: "", from: "", to: "", sender: "", contractAddressSigner: "" };
}

export const MsgTransferNft = {
  encode(message: MsgTransferNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(18).string(message.tokenId);
    }
    if (message.from !== "") {
      writer.uint32(26).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(34).string(message.to);
    }
    if (message.sender !== "") {
      writer.uint32(42).string(message.sender);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(50).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.tokenId = reader.string();
          break;
        case 3:
          message.from = reader.string();
          break;
        case 4:
          message.to = reader.string();
          break;
        case 5:
          message.sender = reader.string();
          break;
        case 6:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferNft {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
      from: isSet(object.from) ? String(object.from) : "",
      to: isSet(object.to) ? String(object.to) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgTransferNft): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    message.sender !== undefined && (obj.sender = message.sender);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferNft>, I>>(object: I): MsgTransferNft {
    const message = createBaseMsgTransferNft();
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    message.sender = object.sender ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgTransferNftResponse(): MsgTransferNftResponse {
  return {};
}

export const MsgTransferNftResponse = {
  encode(_: MsgTransferNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgTransferNftResponse {
    return {};
  },

  toJSON(_: MsgTransferNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferNftResponse>, I>>(_: I): MsgTransferNftResponse {
    const message = createBaseMsgTransferNftResponse();
    return message;
  },
};

function createBaseMsgApproveNft(): MsgApproveNft {
  return { id: "", denomId: "", sender: "", approvedAddress: "", contractAddressSigner: "" };
}

export const MsgApproveNft = {
  encode(message: MsgApproveNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.approvedAddress !== "") {
      writer.uint32(34).string(message.approvedAddress);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(42).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        case 4:
          message.approvedAddress = reader.string();
          break;
        case 5:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgApproveNft {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      approvedAddress: isSet(object.approvedAddress) ? String(object.approvedAddress) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgApproveNft): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.sender !== undefined && (obj.sender = message.sender);
    message.approvedAddress !== undefined && (obj.approvedAddress = message.approvedAddress);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgApproveNft>, I>>(object: I): MsgApproveNft {
    const message = createBaseMsgApproveNft();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.sender = object.sender ?? "";
    message.approvedAddress = object.approvedAddress ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgApproveNftResponse(): MsgApproveNftResponse {
  return {};
}

export const MsgApproveNftResponse = {
  encode(_: MsgApproveNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgApproveNftResponse {
    return {};
  },

  toJSON(_: MsgApproveNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgApproveNftResponse>, I>>(_: I): MsgApproveNftResponse {
    const message = createBaseMsgApproveNftResponse();
    return message;
  },
};

function createBaseMsgApproveAllNft(): MsgApproveAllNft {
  return { operator: "", sender: "", approved: false, contractAddressSigner: "" };
}

export const MsgApproveAllNft = {
  encode(message: MsgApproveAllNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== "") {
      writer.uint32(10).string(message.operator);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.approved === true) {
      writer.uint32(24).bool(message.approved);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(34).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAllNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAllNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.approved = reader.bool();
          break;
        case 4:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgApproveAllNft {
    return {
      operator: isSet(object.operator) ? String(object.operator) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      approved: isSet(object.approved) ? Boolean(object.approved) : false,
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgApproveAllNft): unknown {
    const obj: any = {};
    message.operator !== undefined && (obj.operator = message.operator);
    message.sender !== undefined && (obj.sender = message.sender);
    message.approved !== undefined && (obj.approved = message.approved);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgApproveAllNft>, I>>(object: I): MsgApproveAllNft {
    const message = createBaseMsgApproveAllNft();
    message.operator = object.operator ?? "";
    message.sender = object.sender ?? "";
    message.approved = object.approved ?? false;
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgApproveAllNftResponse(): MsgApproveAllNftResponse {
  return {};
}

export const MsgApproveAllNftResponse = {
  encode(_: MsgApproveAllNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgApproveAllNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveAllNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgApproveAllNftResponse {
    return {};
  },

  toJSON(_: MsgApproveAllNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgApproveAllNftResponse>, I>>(_: I): MsgApproveAllNftResponse {
    const message = createBaseMsgApproveAllNftResponse();
    return message;
  },
};

function createBaseMsgRevokeNft(): MsgRevokeNft {
  return { addressToRevoke: "", denomId: "", tokenId: "", sender: "", contractAddressSigner: "" };
}

export const MsgRevokeNft = {
  encode(message: MsgRevokeNft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.addressToRevoke !== "") {
      writer.uint32(10).string(message.addressToRevoke);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(26).string(message.tokenId);
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(42).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressToRevoke = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.tokenId = reader.string();
          break;
        case 4:
          message.sender = reader.string();
          break;
        case 5:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeNft {
    return {
      addressToRevoke: isSet(object.addressToRevoke) ? String(object.addressToRevoke) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgRevokeNft): unknown {
    const obj: any = {};
    message.addressToRevoke !== undefined && (obj.addressToRevoke = message.addressToRevoke);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.sender !== undefined && (obj.sender = message.sender);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeNft>, I>>(object: I): MsgRevokeNft {
    const message = createBaseMsgRevokeNft();
    message.addressToRevoke = object.addressToRevoke ?? "";
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    message.sender = object.sender ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgRevokeNftResponse(): MsgRevokeNftResponse {
  return {};
}

export const MsgRevokeNftResponse = {
  encode(_: MsgRevokeNftResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeNftResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeNftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRevokeNftResponse {
    return {};
  },

  toJSON(_: MsgRevokeNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgRevokeNftResponse>, I>>(_: I): MsgRevokeNftResponse {
    const message = createBaseMsgRevokeNftResponse();
    return message;
  },
};

function createBaseMsgEditNFT(): MsgEditNFT {
  return { id: "", denomId: "", name: "", uri: "", data: "", sender: "", contractAddressSigner: "" };
}

export const MsgEditNFT = {
  encode(message: MsgEditNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.sender !== "") {
      writer.uint32(50).string(message.sender);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(58).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.uri = reader.string();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.sender = reader.string();
          break;
        case 7:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgEditNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.sender !== undefined && (obj.sender = message.sender);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditNFT>, I>>(object: I): MsgEditNFT {
    const message = createBaseMsgEditNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.sender = object.sender ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgEditNFTResponse(): MsgEditNFTResponse {
  return {};
}

export const MsgEditNFTResponse = {
  encode(_: MsgEditNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgEditNFTResponse {
    return {};
  },

  toJSON(_: MsgEditNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditNFTResponse>, I>>(_: I): MsgEditNFTResponse {
    const message = createBaseMsgEditNFTResponse();
    return message;
  },
};

function createBaseMsgMintNFT(): MsgMintNFT {
  return { denomId: "", name: "", uri: "", data: "", sender: "", recipient: "", contractAddressSigner: "" };
}

export const MsgMintNFT = {
  encode(message: MsgMintNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(26).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(34).string(message.data);
    }
    if (message.sender !== "") {
      writer.uint32(42).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(50).string(message.recipient);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(58).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.uri = reader.string();
          break;
        case 4:
          message.data = reader.string();
          break;
        case 5:
          message.sender = reader.string();
          break;
        case 6:
          message.recipient = reader.string();
          break;
        case 7:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintNFT {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgMintNFT): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.sender !== undefined && (obj.sender = message.sender);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNFT>, I>>(object: I): MsgMintNFT {
    const message = createBaseMsgMintNFT();
    message.denomId = object.denomId ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgMintNFTResponse(): MsgMintNFTResponse {
  return {};
}

export const MsgMintNFTResponse = {
  encode(_: MsgMintNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMintNFTResponse {
    return {};
  },

  toJSON(_: MsgMintNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNFTResponse>, I>>(_: I): MsgMintNFTResponse {
    const message = createBaseMsgMintNFTResponse();
    return message;
  },
};

function createBaseMsgBurnNFT(): MsgBurnNFT {
  return { id: "", denomId: "", sender: "", contractAddressSigner: "" };
}

export const MsgBurnNFT = {
  encode(message: MsgBurnNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.contractAddressSigner !== "") {
      writer.uint32(34).string(message.contractAddressSigner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        case 4:
          message.contractAddressSigner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBurnNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      contractAddressSigner: isSet(object.contractAddressSigner) ? String(object.contractAddressSigner) : "",
    };
  },

  toJSON(message: MsgBurnNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.sender !== undefined && (obj.sender = message.sender);
    message.contractAddressSigner !== undefined &&
      (obj.contractAddressSigner = message.contractAddressSigner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnNFT>, I>>(object: I): MsgBurnNFT {
    const message = createBaseMsgBurnNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.sender = object.sender ?? "";
    message.contractAddressSigner = object.contractAddressSigner ?? "";
    return message;
  },
};

function createBaseMsgBurnNFTResponse(): MsgBurnNFTResponse {
  return {};
}

export const MsgBurnNFTResponse = {
  encode(_: MsgBurnNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgBurnNFTResponse {
    return {};
  },

  toJSON(_: MsgBurnNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnNFTResponse>, I>>(_: I): MsgBurnNFTResponse {
    const message = createBaseMsgBurnNFTResponse();
    return message;
  },
};

/** Msg defines the NFT Msg service. */
export interface Msg {
  /** IssueDenom defines a method for issue a denom. */
  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
  /** MintNFT defines a method for mint a new nft */
  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
  /** EditNFT defines a method for editing a nft. */
  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
  /** TransferNft transfers ownership of the token to recipient account. */
  TransferNft(request: MsgTransferNft): Promise<MsgTransferNftResponse>;
  /** Approve grants permission to spender to transfer or send the given token. */
  ApproveNft(request: MsgApproveNft): Promise<MsgApproveNftResponse>;
  /** Approve grants permission to spender to transfer or send the given token. */
  ApproveAllNft(request: MsgApproveAllNft): Promise<MsgApproveAllNftResponse>;
  /** Revokes permission to spender to transfer or send the given token. */
  RevokeNft(request: MsgRevokeNft): Promise<MsgRevokeNftResponse>;
  /** BurnNFT defines a method for burning a nft. */
  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IssueDenom = this.IssueDenom.bind(this);
    this.MintNFT = this.MintNFT.bind(this);
    this.EditNFT = this.EditNFT.bind(this);
    this.TransferNft = this.TransferNft.bind(this);
    this.ApproveNft = this.ApproveNft.bind(this);
    this.ApproveAllNft = this.ApproveAllNft.bind(this);
    this.RevokeNft = this.RevokeNft.bind(this);
    this.BurnNFT = this.BurnNFT.bind(this);
  }
  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse> {
    const data = MsgIssueDenom.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "IssueDenom", data);
    return promise.then((data) => MsgIssueDenomResponse.decode(new _m0.Reader(data)));
  }

  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse> {
    const data = MsgMintNFT.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "MintNFT", data);
    return promise.then((data) => MsgMintNFTResponse.decode(new _m0.Reader(data)));
  }

  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse> {
    const data = MsgEditNFT.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "EditNFT", data);
    return promise.then((data) => MsgEditNFTResponse.decode(new _m0.Reader(data)));
  }

  TransferNft(request: MsgTransferNft): Promise<MsgTransferNftResponse> {
    const data = MsgTransferNft.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "TransferNft", data);
    return promise.then((data) => MsgTransferNftResponse.decode(new _m0.Reader(data)));
  }

  ApproveNft(request: MsgApproveNft): Promise<MsgApproveNftResponse> {
    const data = MsgApproveNft.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "ApproveNft", data);
    return promise.then((data) => MsgApproveNftResponse.decode(new _m0.Reader(data)));
  }

  ApproveAllNft(request: MsgApproveAllNft): Promise<MsgApproveAllNftResponse> {
    const data = MsgApproveAllNft.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "ApproveAllNft", data);
    return promise.then((data) => MsgApproveAllNftResponse.decode(new _m0.Reader(data)));
  }

  RevokeNft(request: MsgRevokeNft): Promise<MsgRevokeNftResponse> {
    const data = MsgRevokeNft.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "RevokeNft", data);
    return promise.then((data) => MsgRevokeNftResponse.decode(new _m0.Reader(data)));
  }

  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse> {
    const data = MsgBurnNFT.encode(request).finish();
    const promise = this.rpc.request("cudosnode.cudosnode.nft.Msg", "BurnNFT", data);
    return promise.then((data) => MsgBurnNFTResponse.decode(new _m0.Reader(data)));
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
