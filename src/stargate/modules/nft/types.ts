import { MsgIssueDenom, MsgTransferNft, MsgApproveNft, MsgApproveAllNft, MsgRevokeNft, MsgEditNFT, MsgMintNFT, MsgBurnNFT } from "./proto-types/tx";

const PREFIX = "/cudosnode.cudosnode.nft"
export const msgIssueDenom = {
    typeUrl: PREFIX.concat("MsgIssueDenom"),
    type: MsgIssueDenom
};

export const msgTransferNft = {
    typeUrl: PREFIX.concat("MsgTransferNft"),
    type: MsgTransferNft
};

export const msgApproveNft = {
    typeUrl: PREFIX.concat("MsgApproveNft"),
    type: MsgApproveNft
};

export const msgApproveAllNft = {
    typeUrl: PREFIX.concat("MsgApproveAllNft"),
    type: MsgApproveAllNft
};

export const msgRevokeNft = {
    typeUrl: PREFIX.concat("MsgRevokeNft"),
    type: MsgRevokeNft
};

export const msgEditNFT = {
    typeUrl: PREFIX.concat("MsgEditNFT"),
    type: MsgEditNFT
};

export const msgMintNFT = {
    typeUrl: PREFIX.concat("MsgMintNFT"),
    type: MsgMintNFT
};

export const msgBurnNFT = {
    typeUrl: PREFIX.concat("MsgBurnNFT"),
    type: MsgBurnNFT
};