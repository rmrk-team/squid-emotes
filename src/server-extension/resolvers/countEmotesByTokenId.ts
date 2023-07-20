import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import {CountEmotesByTokenIdEntity} from "../model/countEmotesByTokenId";
import {TokenEmote} from "../../model/generated";

@Resolver(() => CountEmotesByTokenIdEntity)
export class MyResolver {
    constructor(private tx: () => Promise<EntityManager>) {}

    @Query(() => [CountEmotesByTokenIdEntity])
    async countEmotesByTokenId(
        @Arg('token_id', { nullable: true, defaultValue: null }) tokenId: string
    ): Promise<CountEmotesByTokenIdEntity[]> {
        const manager = await this.tx()

        const result: [CountEmotesByTokenIdEntity] = await manager.getRepository(TokenEmote).query(
            `
                SELECT emoji, COUNT(*) AS emoji_count
                FROM token_emote WHERE token_id = (CAST($1 as varchar))
                GROUP BY emoji;`,
            [tokenId])

        return result
    }
}