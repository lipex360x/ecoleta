import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class AddPoints1606507930626 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points',
        columns: [
          {
            name: 'point_id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'image',
            type: 'varchar'
          },

          {
            name: 'name',
            type: 'varchar'
          },

          {
            name: 'email',
            type: 'varchar'
          },

          {
            name: 'whatsapp',
            type: 'varchar'
          },

          {
            name: 'latitude',
            type: 'decimal',
            scale: 2
          },

          {
            name: 'longitude',
            type: 'decimal',
            scale: 2
          },

          {
            name: 'city',
            type: 'varchar'
          },

          {
            name: 'uf',
            type: 'varchar',
            length: '2'
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
    await queryRunner.dropTable('points')
  }
}
