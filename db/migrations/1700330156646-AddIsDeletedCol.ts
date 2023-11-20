import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsDeletedCol1700330156646 implements MigrationInterface {
    name = 'AddIsDeletedCol1700330156646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_a9c5f4ec6cceb1604b4a3c84c87\` ON \`article\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`lastModified\` \`lastModified\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`lastModified\` \`lastModified\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`CREATE INDEX \`FK_a9c5f4ec6cceb1604b4a3c84c87\` ON \`article\` (\`authorId\`)`);
    }

}
