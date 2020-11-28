import { Repository, getRepository } from 'typeorm'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsInterface, { CreateProps } from '@modules/items/repositories/interfaces/IItemsInterface'

export default class PostgresItemsRepository implements IItemsInterface {
  private repository: Repository<Item>

  constructor () {
    this.repository = getRepository(Item)
  }

  async create ({ image, title }:CreateProps): Promise<Item> {
    const item = this.repository.create({ image, title })

    await this.repository.save(item)

    return item
  }

  async listAll (): Promise<Item[]> {
    const getItems = await this.repository.find()

    return getItems
  }
  // Repositories Methods
}
