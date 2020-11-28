import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsInterface from '@modules/items/repositories/interfaces/IItemsInterface'

@injectable()
export default class ListItemsService {
  constructor (
    @inject('ItemsRepository')
    private repository: IItemsInterface
  ) {}

  async execute (): Promise<Item[]> {
    const getItems = await this.repository.listAll()

    return getItems
  }
}
