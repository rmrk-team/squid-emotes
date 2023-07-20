import { Field, ObjectType } from 'type-graphql';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class CountEmotesByTokenIdEntity {
    @Field(() => String, { nullable: false })
    emoji!: string;

    @Field(() => Number, { nullable: false, defaultValue: 0, name: 'emojiCount' })
    emoji_count!: number;

    constructor(props: Partial<CountEmotesByTokenIdEntity>) {
        Object.assign(this, props);
    }
}
