import { v4 as uuid } from 'uuid'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository, { CreateProps } from '../interfaces/IPointsRepository'

export default class FakePointRepository implements IPointsRepository {
  private repository: Point[] = []

  async create ({ name, image, email, whatsapp, latitude, longitude, city, uf, items }:CreateProps): Promise<Point> {
    const point = new Point()

    Object.assign(point, {
      point_id: uuid(),
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      point_items: items,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(point)

    return point
  }
}
