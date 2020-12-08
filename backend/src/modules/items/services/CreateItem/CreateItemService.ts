import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Item from '@modules/items/infra/typeorm/entities/Item'
import IItemsRepository from '@modules/items/repositories/interfaces/IItemsRepository'
import IStorageProvider from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'

interface Request{
  title: string
  image: string
}

@injectable()
export default class CreateItemService {
  constructor (
    @inject('ItemsRepository')
    private repository: IItemsRepository,

    @inject('StorageProvider')
    private storage: IStorageProvider
  ) {}

  async execute ({ title, image }: Request): Promise<Item> {
    const getItem = await this.repository.findByName({ title })

    if (getItem) throw new AppError('This item already exists')

    await this.storage.saveFile({ file: image })

    const item = await this.repository.create({ title, image })

    return item
  }
}
