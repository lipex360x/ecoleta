import { container } from 'tsyringe'

import IPointsRepository from './interfaces/IPointsRepository'
import PostgresPointsRepository from '@modules/points/infra/typeorm/repositories/implementations/PostgresPointsRepository'

const providers = {
  postgres: PostgresPointsRepository
}

container.registerSingleton<IPointsRepository>(
  'PointsRepository',
  providers.postgres
)
