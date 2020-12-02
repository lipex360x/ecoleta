import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsRepository from '@modules/items/repositories/interfaces/IItemsRepository'

interface Request{
  title: string
  image: string
}

@injectable()
export default class CreateItemService {
  constructor (
    @inject('ItemsRepository')
    private repository: IItemsRepository
  ) {}

  async execute ({ title, image }: Request): Promise<Item> {
    const getItem = await this.repository.findByName({ title })

    if (getItem) throw new AppError('This item already exists')

    const item = await this.repository.create({ title, image })

    return item
  }
}
