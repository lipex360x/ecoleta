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
import Point_Items from './Point_Items'

@Entity('points')
export default class Point {
  @PrimaryColumn('uuid')
  point_id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;

  @OneToMany(() => Point_Items, point_items => point_items.points, {
    cascade: true,
    eager: true
  })
  point_items: Point_Items[]

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  city: string;

  @Column({ length: 2 })
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  pointProps (): void {
    this.point_id = uuid()
  }
}
