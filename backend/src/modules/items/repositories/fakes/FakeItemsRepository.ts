import { v4 as uuid } from 'uuid'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsInterface, { CreateProps } from '../interfaces/IItemsInterface'

export default class FakeItemsRepository implements IItemsInterface {
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

  async listAll (): Promise<Item[]> {
    return this.repository
  }
}
