module.exports = class Data1688658725706 {
    name = 'Data1688658725706'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_38414873c187a3e0c7943bc4c7" ON "block" ("number") `)
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
        await db.query(`CREATE TABLE "emotes" ("id" character varying NOT NULL, "chain_id" integer NOT NULL, "emoter" text NOT NULL, "collection" text NOT NULL, "token_id" numeric NOT NULL, "emoji" text NOT NULL, "on" boolean NOT NULL, "block_id" character varying, CONSTRAINT "PK_cb6e5f698047510ae02455a74fc" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ade9a88df61756a2cbbe6685f4" ON "emotes" ("block_id") `)
        await db.query(`CREATE INDEX "IDX_19a4f97e2217ef7ce97f772a8d" ON "emotes" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_a1fc0c81ad742cd804e94b4436" ON "emotes" ("emoter") `)
        await db.query(`CREATE INDEX "IDX_36a2d912fabd9866c5ecb33b41" ON "emotes" ("collection") `)
        await db.query(`CREATE INDEX "IDX_06d8817de4865aa4ef3edf92c0" ON "emotes" ("token_id") `)
        await db.query(`ALTER TABLE "emotes" ADD CONSTRAINT "FK_ade9a88df61756a2cbbe6685f46" FOREIGN KEY ("block_id") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_38414873c187a3e0c7943bc4c7"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`DROP TABLE "emotes"`)
        await db.query(`DROP INDEX "public"."IDX_ade9a88df61756a2cbbe6685f4"`)
        await db.query(`DROP INDEX "public"."IDX_19a4f97e2217ef7ce97f772a8d"`)
        await db.query(`DROP INDEX "public"."IDX_a1fc0c81ad742cd804e94b4436"`)
        await db.query(`DROP INDEX "public"."IDX_36a2d912fabd9866c5ecb33b41"`)
        await db.query(`DROP INDEX "public"."IDX_06d8817de4865aa4ef3edf92c0"`)
        await db.query(`ALTER TABLE "emotes" DROP CONSTRAINT "FK_ade9a88df61756a2cbbe6685f46"`)
    }
}
