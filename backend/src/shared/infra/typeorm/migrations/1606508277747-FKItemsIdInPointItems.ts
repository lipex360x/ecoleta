import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export default class FKItemsIdInPointItems1606508277747
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'point_items',
      new TableColumn({
        name: 'item_id',
        type: 'uuid',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'point_items',
      new TableForeignKey({
        name: 'point_itemsToitems',
        columnNames: ['item_id'],

        referencedTableName: 'items',
        referencedColumnNames: ['item_id'],

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('point_items', 'point_itemsToitems')
    await queryRunner.dropColumn('point_items', 'item_id')
  }
}
