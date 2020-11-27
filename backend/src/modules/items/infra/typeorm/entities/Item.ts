import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm'

@Entity('items')
export default class Item {
  @PrimaryColumn('uuid')
  item_id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  itemProps (): void {
    this.item_id = uuid()
  }
}
