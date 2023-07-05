import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './abi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Emoted: new LogEvent<([emoter: string, collection: string, tokenId: bigint, emoji: string, on: boolean] & {emoter: string, collection: string, tokenId: bigint, emoji: string, on: boolean})>(
        abi, '0x6b0e468bf8d2b303be2f302153e4c5d06cdf1fc436eab9e127e482dc596dc0b7'
    ),
}

export const functions = {
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    bulkEmote: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>}, []>(
        abi, '0x2d2ac944'
    ),
    bulkEmoteCountOf: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>}, Array<bigint>>(
        abi, '0x7595ecab'
    ),
    bulkPrepareMessagesToPresignEmote: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>}, Array<string>>(
        abi, '0x7d42e2bc'
    ),
    bulkPresignedEmote: new Func<[emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>, v: Array<number>, r: Array<string>, s: Array<string>], {emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>, v: Array<number>, r: Array<string>, s: Array<string>}, []>(
        abi, '0xef056141'
    ),
    emote: new Func<[collection: string, tokenId: bigint, emoji: string, state: boolean], {collection: string, tokenId: bigint, emoji: string, state: boolean}, []>(
        abi, '0xb1495281'
    ),
    emoteCountOf: new Func<[collection: string, tokenId: bigint, emoji: string], {collection: string, tokenId: bigint, emoji: string}, bigint>(
        abi, '0xdad998a6'
    ),
    hasEmoterUsedEmote: new Func<[emoter: string, collection: string, tokenId: bigint, emoji: string], {emoter: string, collection: string, tokenId: bigint, emoji: string}, boolean>(
        abi, '0x637b5d81'
    ),
    haveEmotersUsedEmotes: new Func<[emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>], {emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>}, Array<boolean>>(
        abi, '0x39e5c8f9'
    ),
    prepareMessageToPresignEmote: new Func<[collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint], {collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint}, string>(
        abi, '0xa3a370b4'
    ),
    presignedEmote: new Func<[emoter: string, collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint, v: number, r: string, s: string], {emoter: string, collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0x81af4ca3'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
}

export class Contract extends ContractBase {

    DOMAIN_SEPARATOR(): Promise<string> {
        return this.eth_call(functions.DOMAIN_SEPARATOR, [])
    }

    bulkEmoteCountOf(collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>): Promise<Array<bigint>> {
        return this.eth_call(functions.bulkEmoteCountOf, [collections, tokenIds, emojis])
    }

    bulkPrepareMessagesToPresignEmote(collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>): Promise<Array<string>> {
        return this.eth_call(functions.bulkPrepareMessagesToPresignEmote, [collections, tokenIds, emojis, states, deadlines])
    }

    emoteCountOf(collection: string, tokenId: bigint, emoji: string): Promise<bigint> {
        return this.eth_call(functions.emoteCountOf, [collection, tokenId, emoji])
    }

    hasEmoterUsedEmote(emoter: string, collection: string, tokenId: bigint, emoji: string): Promise<boolean> {
        return this.eth_call(functions.hasEmoterUsedEmote, [emoter, collection, tokenId, emoji])
    }

    haveEmotersUsedEmotes(emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>): Promise<Array<boolean>> {
        return this.eth_call(functions.haveEmotersUsedEmotes, [emoters, collections, tokenIds, emojis])
    }

    prepareMessageToPresignEmote(collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint): Promise<string> {
        return this.eth_call(functions.prepareMessageToPresignEmote, [collection, tokenId, emoji, state, deadline])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }
}
