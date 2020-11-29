import { Repository, getRepository, In } from 'typeorm'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsRepository, { CreateProps, FindAllByIdProps } from '@modules/items/repositories/interfaces/IItemsRepository'

export default class PostgresItemsRepository implements IItemsRepository {
  private repository: Repository<Item>

  constructor () {
    this.repository = getRepository(Item)
  }

  async create ({ image, title }:CreateProps): Promise<Item> {
    const item = this.repository.create({ image, title })

    await this.repository.save(item)

    return item
  }

  async findAll (): Promise<Item[]> {
    const getItems = await this.repository.find()

    return getItems
  }

  async findAllById ({ arrayItemsIds }:FindAllByIdProps): Promise<Item[]> {
    const getProducts = await this.repository.find({
      where: {
        item_id: In(arrayItemsIds)
      }
    })

    return getProducts
  }
}
