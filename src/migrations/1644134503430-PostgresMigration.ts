import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration1644134503430 implements MigrationInterface {
  name = 'PostgresMigration1644134503430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" uuid NOT NULL, CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0273ece23af9b3e55ad6af2fda" ON "board_column" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_865a0f2e22c140d261b1df80eb" ON "board" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb213f79ee45060ba925ecd576" ON "task" ("id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "board_column" ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) VALUES('admin','admin','$2b$10$dVTbGI5UNWLe8aZULXCiOeabKRUDT9zhurLXuniwPHlTWoaW6DRyu')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb213f79ee45060ba925ecd576"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_865a0f2e22c140d261b1df80eb"`,
    );
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0273ece23af9b3e55ad6af2fda"`,
    );
    await queryRunner.query(`DROP TABLE "board_column"`);
  }
}
