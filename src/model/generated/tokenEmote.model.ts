import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import {Token} from "./token.model"
import {Emoter} from "./emoter.model"

@Entity_()
export class TokenEmote {
    constructor(props?: Partial<TokenEmote>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    emoji!: string

    @Index_()
    @ManyToOne_(() => Token, {nullable: true})
    token!: Token | undefined | null

    @Index_()
    @ManyToOne_(() => Emoter, {nullable: true})
    emoter!: Emoter | undefined | null

    @Column_("bool", {nullable: false})
    on!: boolean

    @Index_()
    @Column_("int4", {nullable: false})
    chainId!: number
}
