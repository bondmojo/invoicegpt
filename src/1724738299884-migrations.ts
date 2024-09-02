import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724738299884 implements MigrationInterface {
    name = 'Migrations1724738299884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "igst_tax_amount" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "igst_tax_amount"`);
    }

}
