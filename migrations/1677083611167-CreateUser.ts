import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { Role } from '../src/modules/auth/role.enum';

export class CreateUser1677083611167 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'rnokpp',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'registration_address',
            type: 'varchar',
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phones',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'user_role',
            type: 'enum',
            default: Role.User,
            enum: Object.values(Role),
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'commission',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['commissions'],
        referencedColumnNames: ['id'],
        referencedTableName: 'commission',
      }),
    );

    await queryRunner.createForeignKey(
      'commission',
      new TableForeignKey({
        columnNames: ['users'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
