import { container } from 'tsyringe'

import IItemsRepository from './interfaces/IItemsRepository'
import PostgresItemsRepository from '../infra/typeorm/repositories/implementations/PostgresItemsRepository'

const providers = {
  postgres: PostgresItemsRepository
}

container.registerSingleton<IItemsRepository>(
  'ItemsRepository',
  providers.postgres
)
