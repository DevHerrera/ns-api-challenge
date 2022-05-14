import {MigrationInterface, QueryRunner} from "typeorm";

export class FixMigration1652562812283 implements MigrationInterface {
    name = 'FixMigration1652562812283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "is_published" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "is_published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "created_at"`);
    }

}
