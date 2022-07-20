/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "cudosnode.cudosnode.nft";

/** BaseNFT defines a non-fungible token */
export interface BaseNFT {
  id: string;
  name: string;
  uri: string;
  data: string;
  owner: string;
  approvedAddresses: string[];
}

/** Denom defines a type of NFT */
export interface Denom {
  id: string;
  name: string;
  schema: string;
  creator: string;
  symbol: string;
}

/** IDCollection defines a type of collection with specified ID */
export interface IDCollection {
  denomId: string;
  tokenIds: string[];
}

/** Owner defines a type of owner */
export interface Owner {
  address: string;
  idCollections: IDCollection[];
}

/** Collection defines a type of collection */
export interface Collection {
  denom?: Denom;
  nfts: BaseNFT[];
}

export interface ApprovedAddresses {
  approvedAddresses: { [key: string]: ApprovedAddressesData };
}

export interface ApprovedAddresses_ApprovedAddressesEntry {
  key: string;
  value?: ApprovedAddressesData;
}

export interface ApprovedAddressesData {
  approvedAddressesData: { [key: string]: boolean };
}

export interface ApprovedAddressesData_ApprovedAddressesDataEntry {
  key: string;
  value: boolean;
}

function createBaseBaseNFT(): BaseNFT {
  return { id: "", name: "", uri: "", data: "", owner: "", approvedAddresses: [] };
}

export const BaseNFT = {
  encode(message: BaseNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    for (const v of message.approvedAddresses) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseNFT();
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
          message.uri = reader.string();
          break;
        case 4:
          message.data = reader.string();
          break;
        case 5:
          message.owner = reader.string();
          break;
        case 6:
          message.approvedAddresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      approvedAddresses: Array.isArray(object?.approvedAddresses)
        ? object.approvedAddresses.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: BaseNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.approvedAddresses) {
      obj.approvedAddresses = message.approvedAddresses.map((e) => e);
    } else {
      obj.approvedAddresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseNFT>, I>>(object: I): BaseNFT {
    const message = createBaseBaseNFT();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.owner = object.owner ?? "";
    message.approvedAddresses = object.approvedAddresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseDenom(): Denom {
  return { id: "", name: "", schema: "", creator: "", symbol: "" };
}

export const Denom = {
  encode(message: Denom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.schema !== "") {
      writer.uint32(26).string(message.schema);
    }
    if (message.creator !== "") {
      writer.uint32(34).string(message.creator);
    }
    if (message.symbol !== "") {
      writer.uint32(42).string(message.symbol);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Denom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenom();
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
          message.creator = reader.string();
          break;
        case 5:
          message.symbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Denom {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      schema: isSet(object.schema) ? String(object.schema) : "",
      creator: isSet(object.creator) ? String(object.creator) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
    };
  },

  toJSON(message: Denom): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.schema !== undefined && (obj.schema = message.schema);
    message.creator !== undefined && (obj.creator = message.creator);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Denom>, I>>(object: I): Denom {
    const message = createBaseDenom();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.schema = object.schema ?? "";
    message.creator = object.creator ?? "";
    message.symbol = object.symbol ?? "";
    return message;
  },
};

function createBaseIDCollection(): IDCollection {
  return { denomId: "", tokenIds: [] };
}

export const IDCollection = {
  encode(message: IDCollection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    for (const v of message.tokenIds) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IDCollection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIDCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.tokenIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IDCollection {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenIds: Array.isArray(object?.tokenIds) ? object.tokenIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: IDCollection): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    if (message.tokenIds) {
      obj.tokenIds = message.tokenIds.map((e) => e);
    } else {
      obj.tokenIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IDCollection>, I>>(object: I): IDCollection {
    const message = createBaseIDCollection();
    message.denomId = object.denomId ?? "";
    message.tokenIds = object.tokenIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseOwner(): Owner {
  return { address: "", idCollections: [] };
}

export const Owner = {
  encode(message: Owner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.idCollections) {
      IDCollection.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Owner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.idCollections.push(IDCollection.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Owner {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      idCollections: Array.isArray(object?.idCollections)
        ? object.idCollections.map((e: any) => IDCollection.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Owner): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.idCollections) {
      obj.idCollections = message.idCollections.map((e) => (e ? IDCollection.toJSON(e) : undefined));
    } else {
      obj.idCollections = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Owner>, I>>(object: I): Owner {
    const message = createBaseOwner();
    message.address = object.address ?? "";
    message.idCollections = object.idCollections?.map((e) => IDCollection.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCollection(): Collection {
  return { denom: undefined, nfts: [] };
}

export const Collection = {
  encode(message: Collection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.nfts) {
      BaseNFT.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Collection {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        case 2:
          message.nfts.push(BaseNFT.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Collection {
    return {
      denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined,
      nfts: Array.isArray(object?.nfts) ? object.nfts.map((e: any) => BaseNFT.fromJSON(e)) : [],
    };
  },

  toJSON(message: Collection): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
    if (message.nfts) {
      obj.nfts = message.nfts.map((e) => (e ? BaseNFT.toJSON(e) : undefined));
    } else {
      obj.nfts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Collection>, I>>(object: I): Collection {
    const message = createBaseCollection();
    message.denom =
      object.denom !== undefined && object.denom !== null ? Denom.fromPartial(object.denom) : undefined;
    message.nfts = object.nfts?.map((e) => BaseNFT.fromPartial(e)) || [];
    return message;
  },
};

function createBaseApprovedAddresses(): ApprovedAddresses {
  return { approvedAddresses: {} };
}

export const ApprovedAddresses = {
  encode(message: ApprovedAddresses, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.approvedAddresses).forEach(([key, value]) => {
      ApprovedAddresses_ApprovedAddressesEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedAddresses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = ApprovedAddresses_ApprovedAddressesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.approvedAddresses[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApprovedAddresses {
    return {
      approvedAddresses: isObject(object.approvedAddresses)
        ? Object.entries(object.approvedAddresses).reduce<{ [key: string]: ApprovedAddressesData }>(
            (acc, [key, value]) => {
              acc[key] = ApprovedAddressesData.fromJSON(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: ApprovedAddresses): unknown {
    const obj: any = {};
    obj.approvedAddresses = {};
    if (message.approvedAddresses) {
      Object.entries(message.approvedAddresses).forEach(([k, v]) => {
        obj.approvedAddresses[k] = ApprovedAddressesData.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApprovedAddresses>, I>>(object: I): ApprovedAddresses {
    const message = createBaseApprovedAddresses();
    message.approvedAddresses = Object.entries(object.approvedAddresses ?? {}).reduce<{
      [key: string]: ApprovedAddressesData;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = ApprovedAddressesData.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseApprovedAddresses_ApprovedAddressesEntry(): ApprovedAddresses_ApprovedAddressesEntry {
  return { key: "", value: undefined };
}

export const ApprovedAddresses_ApprovedAddressesEntry = {
  encode(
    message: ApprovedAddresses_ApprovedAddressesEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      ApprovedAddressesData.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedAddresses_ApprovedAddressesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedAddresses_ApprovedAddressesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = ApprovedAddressesData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApprovedAddresses_ApprovedAddressesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? ApprovedAddressesData.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: ApprovedAddresses_ApprovedAddressesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? ApprovedAddressesData.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApprovedAddresses_ApprovedAddressesEntry>, I>>(
    object: I,
  ): ApprovedAddresses_ApprovedAddressesEntry {
    const message = createBaseApprovedAddresses_ApprovedAddressesEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? ApprovedAddressesData.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseApprovedAddressesData(): ApprovedAddressesData {
  return { approvedAddressesData: {} };
}

export const ApprovedAddressesData = {
  encode(message: ApprovedAddressesData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.approvedAddressesData).forEach(([key, value]) => {
      ApprovedAddressesData_ApprovedAddressesDataEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedAddressesData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedAddressesData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = ApprovedAddressesData_ApprovedAddressesDataEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.approvedAddressesData[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApprovedAddressesData {
    return {
      approvedAddressesData: isObject(object.approvedAddressesData)
        ? Object.entries(object.approvedAddressesData).reduce<{ [key: string]: boolean }>(
            (acc, [key, value]) => {
              acc[key] = Boolean(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: ApprovedAddressesData): unknown {
    const obj: any = {};
    obj.approvedAddressesData = {};
    if (message.approvedAddressesData) {
      Object.entries(message.approvedAddressesData).forEach(([k, v]) => {
        obj.approvedAddressesData[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApprovedAddressesData>, I>>(object: I): ApprovedAddressesData {
    const message = createBaseApprovedAddressesData();
    message.approvedAddressesData = Object.entries(object.approvedAddressesData ?? {}).reduce<{
      [key: string]: boolean;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Boolean(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseApprovedAddressesData_ApprovedAddressesDataEntry(): ApprovedAddressesData_ApprovedAddressesDataEntry {
  return { key: "", value: false };
}

export const ApprovedAddressesData_ApprovedAddressesDataEntry = {
  encode(
    message: ApprovedAddressesData_ApprovedAddressesDataEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApprovedAddressesData_ApprovedAddressesDataEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprovedAddressesData_ApprovedAddressesDataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApprovedAddressesData_ApprovedAddressesDataEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Boolean(object.value) : false,
    };
  },

  toJSON(message: ApprovedAddressesData_ApprovedAddressesDataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApprovedAddressesData_ApprovedAddressesDataEntry>, I>>(
    object: I,
  ): ApprovedAddressesData_ApprovedAddressesDataEntry {
    const message = createBaseApprovedAddressesData_ApprovedAddressesDataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? false;
    return message;
  },
};

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
