import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724682554075 implements MigrationInterface {
    name = 'Migrations1724682554075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP CONSTRAINT "FK_f4fe88f342df2683185084e3d30"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "hsnCode"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "cgst"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "sgst"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "cgst"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "sgst"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "grandTotal"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "gstin"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "invoiceImageId"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "gstin" character varying`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "hsn_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "unit_price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "total" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "currency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "subtotal" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "tax_rate" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "tax_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "cgst_tax_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "sgst_tax_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "total_tax_amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "grand_total" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "invoiceImageIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD CONSTRAINT "FK_e94238d316f8c5c5734000992b8" FOREIGN KEY ("invoiceImageIdId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP CONSTRAINT "FK_e94238d316f8c5c5734000992b8"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "invoiceImageIdId"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "grand_total"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "total_tax_amount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "sgst_tax_amount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "cgst_tax_amount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "tax_amount"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "tax_rate"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP COLUMN "hsn_code"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "gstin"`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "invoiceImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "gstin" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "grandTotal" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "sgst" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "cgst" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD "totalAmount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "totalAmount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "sgst" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "cgst" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD "hsnCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invoice_entity" ADD CONSTRAINT "FK_f4fe88f342df2683185084e3d30" FOREIGN KEY ("invoiceImageId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
