module.exports = class Data1688644420147 {
    name = 'Data1688644420147'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_38414873c187a3e0c7943bc4c7" ON "block" ("number") `)
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block_number" integer, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "hash" text NOT NULL, "to" text, "from" text, "status" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2d99bb5a0ab5fb8cf8b746eb39" ON "transaction" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_bf7f889412fc52430b609e70b4" ON "transaction" ("block_timestamp") `)
        await db.query(`CREATE INDEX "IDX_de4f0899c41c688529784bc443" ON "transaction" ("hash") `)
        await db.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `)
        await db.query(`CREATE INDEX "IDX_290df3897fac99713afb5f3d7a" ON "transaction" ("from") `)
        await db.query(`CREATE INDEX "IDX_63f749fc7f7178ae1ad85d3b95" ON "transaction" ("status") `)
        await db.query(`CREATE TABLE "contract_event_emoted" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "contract" text NOT NULL, "event_name" text NOT NULL, "emoter" text NOT NULL, "collection" text NOT NULL, "token_id" numeric NOT NULL, "emoji" text NOT NULL, "on" boolean NOT NULL, CONSTRAINT "PK_5ab2a139ff820ca23f98723ca79" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_5e2bbb63a53260f06e82313098" ON "contract_event_emoted" ("block_number") `)
        await db.query(`CREATE INDEX "IDX_8edf54dc762e41e322c57a84c1" ON "contract_event_emoted" ("block_timestamp") `)
        await db.query(`CREATE INDEX "IDX_3c52c31fd0216dbd3281d23830" ON "contract_event_emoted" ("transaction_hash") `)
        await db.query(`CREATE INDEX "IDX_cd03d5f3e0562e79445e652127" ON "contract_event_emoted" ("contract") `)
        await db.query(`CREATE INDEX "IDX_5825c3a730046be95946432819" ON "contract_event_emoted" ("event_name") `)
        await db.query(`CREATE INDEX "IDX_0e17857ca108eb7d0c4369879a" ON "contract_event_emoted" ("emoter") `)
        await db.query(`CREATE INDEX "IDX_0a20b5a4c15e8dbc3b24653029" ON "contract_event_emoted" ("collection") `)
        await db.query(`CREATE INDEX "IDX_dc2237312d312d9b347e033486" ON "contract_event_emoted" ("token_id") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_38414873c187a3e0c7943bc4c7"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`DROP TABLE "transaction"`)
        await db.query(`DROP INDEX "public"."IDX_2d99bb5a0ab5fb8cf8b746eb39"`)
        await db.query(`DROP INDEX "public"."IDX_bf7f889412fc52430b609e70b4"`)
        await db.query(`DROP INDEX "public"."IDX_de4f0899c41c688529784bc443"`)
        await db.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`)
        await db.query(`DROP INDEX "public"."IDX_290df3897fac99713afb5f3d7a"`)
        await db.query(`DROP INDEX "public"."IDX_63f749fc7f7178ae1ad85d3b95"`)
        await db.query(`DROP TABLE "contract_event_emoted"`)
        await db.query(`DROP INDEX "public"."IDX_5e2bbb63a53260f06e82313098"`)
        await db.query(`DROP INDEX "public"."IDX_8edf54dc762e41e322c57a84c1"`)
        await db.query(`DROP INDEX "public"."IDX_3c52c31fd0216dbd3281d23830"`)
        await db.query(`DROP INDEX "public"."IDX_cd03d5f3e0562e79445e652127"`)
        await db.query(`DROP INDEX "public"."IDX_5825c3a730046be95946432819"`)
        await db.query(`DROP INDEX "public"."IDX_0e17857ca108eb7d0c4369879a"`)
        await db.query(`DROP INDEX "public"."IDX_0a20b5a4c15e8dbc3b24653029"`)
        await db.query(`DROP INDEX "public"."IDX_dc2237312d312d9b347e033486"`)
    }
}
