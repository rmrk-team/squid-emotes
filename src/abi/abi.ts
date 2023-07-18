import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './abi.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Emoted: new LogEvent<([emoter: string, collection: string, tokenId: bigint, emoji: string, on: boolean] & {emoter: string, collection: string, tokenId: bigint, emoji: string, on: boolean})>(
        abi, '0xc2b82fdaed025f01d8e5b2b33a92ae334e5aea9c6f7c9b09a0b51a21540efdb5'
    ),
}

export const functions = {
    DOMAIN_SEPARATOR: new Func<[], {}, string>(
        abi, '0x3644e515'
    ),
    bulkEmote: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>}, []>(
        abi, '0xd892eb9c'
    ),
    bulkEmoteCountOf: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>}, Array<bigint>>(
        abi, '0x4e40a74d'
    ),
    bulkPrepareMessagesToPresignEmote: new Func<[collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>], {collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>}, Array<string>>(
        abi, '0xd600afe6'
    ),
    bulkPresignedEmote: new Func<[emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>, v: Array<number>, r: Array<string>, s: Array<string>], {emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>, states: Array<boolean>, deadlines: Array<bigint>, v: Array<number>, r: Array<string>, s: Array<string>}, []>(
        abi, '0xa802a32d'
    ),
    emote: new Func<[collection: string, tokenId: bigint, emoji: string, state: boolean], {collection: string, tokenId: bigint, emoji: string, state: boolean}, []>(
        abi, '0x760cc088'
    ),
    emoteCountOf: new Func<[collection: string, tokenId: bigint, emoji: string], {collection: string, tokenId: bigint, emoji: string}, bigint>(
        abi, '0xf1bf462c'
    ),
    hasEmoterUsedEmote: new Func<[emoter: string, collection: string, tokenId: bigint, emoji: string], {emoter: string, collection: string, tokenId: bigint, emoji: string}, boolean>(
        abi, '0x49471116'
    ),
    haveEmotersUsedEmotes: new Func<[emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>], {emoters: Array<string>, collections: Array<string>, tokenIds: Array<bigint>, emojis: Array<string>}, Array<boolean>>(
        abi, '0xcb55d7b1'
    ),
    prepareMessageToPresignEmote: new Func<[collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint], {collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint}, string>(
        abi, '0x40f4352d'
    ),
    presignedEmote: new Func<[emoter: string, collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint, v: number, r: string, s: string], {emoter: string, collection: string, tokenId: bigint, emoji: string, state: boolean, deadline: bigint, v: number, r: string, s: string}, []>(
        abi, '0xb6b6129f'
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
