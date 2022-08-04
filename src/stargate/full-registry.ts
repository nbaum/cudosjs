import { Registry } from "@cosmjs/proto-signing";
import { ProtoType, registerMsgs } from "../utils/module-utils";
import {defaultRegistryTypes} from "@cosmjs/stargate"
import * as nftMsgTypes from "./modules/nft/types"
import * as gravityMsgTypes from "./modules/gravity/types"
import * as groupMsgTypes from "./modules/group/types"

interface ITypesMap{
    [name:string]:ProtoType
}

let msgTypesArray: ProtoType[] = []
const msgTypesMap:ITypesMap = {...nftMsgTypes,...gravityMsgTypes,...groupMsgTypes}


// Creating a registry containing the messages for all custom modules
// This is used in CudosStargateClient - so that it can decode all messages info that a query returns
// The native methods in the CudosStargateClient decode the data, but custom queries
// based on parameters and filters returns the tx data encoded.
export function getFullRegistry():Registry{
    const queryRegistry = new Registry(defaultRegistryTypes)
    for (let m in msgTypesMap ){
        msgTypesArray.push(msgTypesMap[m])
    }
    registerMsgs(queryRegistry,[
        ...msgTypesArray
    ])

    return queryRegistry
}
 