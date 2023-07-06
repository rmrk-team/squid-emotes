import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {TokenEmote} from "./tokenEmote.model"

@Entity_()
export class Emoter {
    constructor(props?: Partial<Emoter>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => TokenEmote, e => e.emoter)
    emotes!: TokenEmote[]
}
