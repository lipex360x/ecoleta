import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class FKPointIdInPointItems1606509235660
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'point_items',
      new TableColumn({
        name: 'point_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'point_items',
      new TableForeignKey({
        name: 'point_itemsTopoints',
        columnNames: ['point_id'],

        referencedTableName: 'points',
        referencedColumnNames: ['point_id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('point_items', 'point_itemsTopoints')
    await queryRunner.dropColumn('point_items', 'point_id')
  }
}
