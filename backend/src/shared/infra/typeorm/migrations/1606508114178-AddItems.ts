import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class AddItems1606508114178 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'item_id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'title',
            type: 'varchar'
          },

          {
            name: 'image',
            type: 'varchar'
          },

          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items')
  }
}
