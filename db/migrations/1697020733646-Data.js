module.exports = class Data1697020733646 {
    name = 'Data1697020733646'

    async up(db) {
        await db.query(`ALTER TABLE "block" ADD "hash" text NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "block" DROP COLUMN "hash"`)
    }
}
