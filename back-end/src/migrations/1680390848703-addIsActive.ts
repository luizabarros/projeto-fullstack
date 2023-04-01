import { MigrationInterface, QueryRunner } from "typeorm";

export class addIsActive1680390848703 implements MigrationInterface {
    name = 'addIsActive1680390848703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "isActive"`);
    }

}
