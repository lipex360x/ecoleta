import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import Point from './Point'
import Item from '@modules/items/infra/typeorm/entities/Item'

@Entity('point_items')
export default class Point_Items {
  @PrimaryColumn('uuid')
  point_item_id: string;

  @ManyToOne(() => Point, points => points.point_items)
  @JoinColumn({ name: 'point_id' })
  points: Point

  @Column('uuid')
  point_id: string;

  @ManyToOne(() => Item, items => items.point_items, { eager: true })
  @JoinColumn({ name: 'item_id' })
  items: Item

  @Column('uuid')
  item_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  point_itemsProps (): void {
    this.point_item_id = uuid()
  }
}
