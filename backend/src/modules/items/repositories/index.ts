import { container } from 'tsyringe'

import IItemsInterface from './interfaces/IItemsInterface'
import PostgresItemsRepository from '../infra/typeorm/repositories/implementations/PostgresItemsRepository'

const providers = {
  postgres: PostgresItemsRepository
}

container.registerSingleton<IItemsInterface>(
  'ItemsRepository',
  providers.postgres
)
