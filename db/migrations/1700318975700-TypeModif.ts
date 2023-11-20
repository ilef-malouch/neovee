import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeModif1700318975700 implements MigrationInterface {
    name = 'TypeModif1700318975700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`content\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`lastModified\` \`lastModified\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`authorId\` \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`authorId\` \`authorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`lastModified\` \`lastModified\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
