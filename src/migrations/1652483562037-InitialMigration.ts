import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1652483562037 implements MigrationInterface {
    name = 'InitialMigration1652483562037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User_Followers" ("user_follower_id" integer NOT NULL, "user_creator_id" integer NOT NULL, CONSTRAINT "PK_8f6fb6969fbce6094d2302e456d" PRIMARY KEY ("user_follower_id", "user_creator_id"))`);
        await queryRunner.query(`CREATE TABLE "Videos_Liked_By_Users" ("user_id" integer NOT NULL, "video_id" integer NOT NULL, CONSTRAINT "PK_84e66c33f96faf98f3ad2d67406" PRIMARY KEY ("user_id", "video_id"))`);
        await queryRunner.query(`CREATE TABLE "Videos" ("id" SERIAL NOT NULL, "source_url" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "is_published" boolean NOT NULL DEFAULT '0', "user_owner_id" integer NOT NULL, CONSTRAINT "PK_3cafd1e310bdf514e0d6a94df1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "photo_url" character varying NOT NULL, "email" character varying NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "User_Followers" ADD CONSTRAINT "FK_1edf225d5043eb1d3f9156b9b50" FOREIGN KEY ("user_follower_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User_Followers" ADD CONSTRAINT "FK_14c00486a378bedba59fcd3fb1b" FOREIGN KEY ("user_creator_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" ADD CONSTRAINT "FK_d58bb3611f3a420f6c799c5752a" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" ADD CONSTRAINT "FK_77c94fd7026e69e19383de5bc53" FOREIGN KEY ("video_id") REFERENCES "Videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD CONSTRAINT "FK_8c075b6c69b631fddd38037f7d2" FOREIGN KEY ("user_owner_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_3bad667ed90ba9cb4c834118416" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_3bad667ed90ba9cb4c834118416"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP CONSTRAINT "FK_8c075b6c69b631fddd38037f7d2"`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" DROP CONSTRAINT "FK_77c94fd7026e69e19383de5bc53"`);
        await queryRunner.query(`ALTER TABLE "Videos_Liked_By_Users" DROP CONSTRAINT "FK_d58bb3611f3a420f6c799c5752a"`);
        await queryRunner.query(`ALTER TABLE "User_Followers" DROP CONSTRAINT "FK_14c00486a378bedba59fcd3fb1b"`);
        await queryRunner.query(`ALTER TABLE "User_Followers" DROP CONSTRAINT "FK_1edf225d5043eb1d3f9156b9b50"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Videos"`);
        await queryRunner.query(`DROP TABLE "Videos_Liked_By_Users"`);
        await queryRunner.query(`DROP TABLE "User_Followers"`);
    }

}
