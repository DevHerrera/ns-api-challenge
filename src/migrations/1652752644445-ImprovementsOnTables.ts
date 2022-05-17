import {MigrationInterface, QueryRunner} from "typeorm";

export class ImprovementsOnTables1652752644445 implements MigrationInterface {
    name = 'ImprovementsOnTables1652752644445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User_Followers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "User_Followers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "is_published" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Videos" ALTER COLUMN "is_published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "User_Followers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "User_Followers" DROP COLUMN "created_at"`);
    }

}
