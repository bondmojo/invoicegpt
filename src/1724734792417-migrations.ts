import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724734792417 implements MigrationInterface {
    name = 'Migrations1724734792417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "tax_rate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "tax_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "cgst_tax_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "sgst_tax_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "total_tax_amount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "total_tax_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "sgst_tax_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "cgst_tax_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "tax_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ALTER COLUMN "tax_rate" SET NOT NULL`);
    }

}
