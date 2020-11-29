import { v4 as uuid } from 'uuid'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsRepository, { CreateProps, FindAllByIdProps } from '../interfaces/IItemsRepository'

export default class FakeItemsRepository implements IItemsRepository {
  private repository: Item[] = []

  async create ({ title, image }:CreateProps): Promise<Item> {
    const item = new Item()

    Object.assign(item, {
      item_id: uuid(),
      title,
      image,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(item)

    return item
  }

  async findAll (): Promise<Item[]> {
    return this.repository
  }

  async findAllById ({ arrayItemsIds }:FindAllByIdProps): Promise<Item[]> {
    const getItems = arrayItemsIds.map(item_id => (
      this.repository.find(item => item.item_id === item_id)
    ))

    return getItems
  }
}
