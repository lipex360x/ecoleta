import { Repository, getRepository } from 'typeorm'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository, { CreateProps } from '@modules/points/repositories/interfaces/IPointsRepository'

export default class PostgresPointsRepository implements IPointsRepository {
  private repository: Repository<Point>

  constructor () {
    this.repository = getRepository(Point)
  }

  async create ({ name, image, email, whatsapp, latitude, longitude, city, uf, items }:CreateProps): Promise<Point> {
    const point = this.repository.create({ name, image, email, whatsapp, latitude, longitude, city, uf, point_items: items })

    await this.repository.save(point)

    return point
  }
}
