module.exports = class Data1689855806622 {
    name = 'Data1689855806622'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "number" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_38414873c187a3e0c7943bc4c7" ON "block" ("number") `)
        await db.query(`CREATE INDEX "IDX_5c67cbcf4960c1a39e5fe25e87" ON "block" ("timestamp") `)
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "token_id" numeric NOT NULL, "collection" text NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_cab3c454b0419a03584a3990ce" ON "token" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_7e5b7bd44f5f2b1f15f193a8ec" ON "token" ("collection") `)
        await db.query(`CREATE TABLE "emoter" ("id" character varying NOT NULL, CONSTRAINT "PK_57b6368fc0ea730aec6e335ea0b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "token_emote" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "emoji" text NOT NULL, "on" boolean NOT NULL, "chain_id" integer NOT NULL, "token_id" character varying, "emoter_id" character varying, CONSTRAINT "PK_a17925944b39ca615cf9d5b62e3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_c436f5c55ab793c6a18a1ae1b8" ON "token_emote" ("emoji") `)
        await db.query(`CREATE INDEX "IDX_50cf2d7e9b92c632a47ebef1c7" ON "token_emote" ("token_id") `)
        await db.query(`CREATE INDEX "IDX_18813301859483cf44e3733afe" ON "token_emote" ("emoter_id") `)
        await db.query(`CREATE INDEX "IDX_9de9098750df0338b906378d35" ON "token_emote" ("chain_id") `)
        await db.query(`ALTER TABLE "token_emote" ADD CONSTRAINT "FK_50cf2d7e9b92c632a47ebef1c7a" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "token_emote" ADD CONSTRAINT "FK_18813301859483cf44e3733afef" FOREIGN KEY ("emoter_id") REFERENCES "emoter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP INDEX "public"."IDX_38414873c187a3e0c7943bc4c7"`)
        await db.query(`DROP INDEX "public"."IDX_5c67cbcf4960c1a39e5fe25e87"`)
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP INDEX "public"."IDX_cab3c454b0419a03584a3990ce"`)
        await db.query(`DROP INDEX "public"."IDX_7e5b7bd44f5f2b1f15f193a8ec"`)
        await db.query(`DROP TABLE "emoter"`)
        await db.query(`DROP TABLE "token_emote"`)
        await db.query(`DROP INDEX "public"."IDX_c436f5c55ab793c6a18a1ae1b8"`)
        await db.query(`DROP INDEX "public"."IDX_50cf2d7e9b92c632a47ebef1c7"`)
        await db.query(`DROP INDEX "public"."IDX_18813301859483cf44e3733afe"`)
        await db.query(`DROP INDEX "public"."IDX_9de9098750df0338b906378d35"`)
        await db.query(`ALTER TABLE "token_emote" DROP CONSTRAINT "FK_50cf2d7e9b92c632a47ebef1c7a"`)
        await db.query(`ALTER TABLE "token_emote" DROP CONSTRAINT "FK_18813301859483cf44e3733afef"`)
    }
}
