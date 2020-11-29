import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsRepository from '@modules/items/repositories/interfaces/IItemsRepository'

@injectable()
export default class ListItemsService {
  constructor (
    @inject('ItemsRepository')
    private repository: IItemsRepository
  ) {}

  async execute (): Promise<Item[]> {
    const getItems = await this.repository.findAll()

    return getItems
  }
}
