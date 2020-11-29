import { v4 as uuid } from 'uuid'
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm'
import { Expose } from 'class-transformer'

import Point_Items from '@modules/points/infra/typeorm/entities/Point_Items'

@Entity('items')
export default class Item {
  @PrimaryColumn('uuid')
  item_id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(() => Point_Items, point_items => point_items.items, {})
  point_items: Point_Items[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getImageUrl (): string | null {
    return this.image ? `${process.env.API_URL}/uploads/${this.image}` : null
  }

  @BeforeInsert()
  itemProps (): void {
    this.item_id = uuid()
  }
}
