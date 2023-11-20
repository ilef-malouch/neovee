import { MigrationInterface, QueryRunner } from 'typeorm';

export class Start1700330815617 implements MigrationInterface {
  name = 'Start1700330815617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`lastModified\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`authorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`article_liked_by_users_user\` (\`articleId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_ca06fa306ac304cc96d7fedd5c\` (\`articleId\`), INDEX \`IDX_522841bb4069b1748b4fdddbb4\` (\`userId\`), PRIMARY KEY (\`articleId\`, \`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_liked_by_users_user\` ADD CONSTRAINT \`FK_ca06fa306ac304cc96d7fedd5c1\` FOREIGN KEY (\`articleId\`) REFERENCES \`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_liked_by_users_user\` ADD CONSTRAINT \`FK_522841bb4069b1748b4fdddbb4b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article_liked_by_users_user\` DROP FOREIGN KEY \`FK_522841bb4069b1748b4fdddbb4b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article_liked_by_users_user\` DROP FOREIGN KEY \`FK_ca06fa306ac304cc96d7fedd5c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_522841bb4069b1748b4fdddbb4\` ON \`article_liked_by_users_user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ca06fa306ac304cc96d7fedd5c\` ON \`article_liked_by_users_user\``,
    );
    await queryRunner.query(`DROP TABLE \`article_liked_by_users_user\``);
    await queryRunner.query(`DROP TABLE \`article\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
