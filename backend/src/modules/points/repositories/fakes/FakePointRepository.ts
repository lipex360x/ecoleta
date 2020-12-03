import { v4 as uuid } from 'uuid'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository, { CreateProps, FindByIdProps, ListPointsFilteredProps } from '../interfaces/IPointsRepository'

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

  async findById ({ point_id }:FindByIdProps): Promise<Point> {
    const getPoint = this.repository.find(point => point.point_id === point_id)

    return getPoint
  }

  listPointsFiltered ({ city, uf, items }:ListPointsFilteredProps): Promise<Point[] > {
    let getPoint = new Point()

    if (city && uf) {
      getPoint = this.repository.filter(point => point.city === city && point.uf === uf)
    }

    if (city) {
      getPoint = this.repository.filter(point => point.city === city)
    }

    if (uf) {
      getPoint = this.repository.filter(point => point.uf === uf)
    }

    return getPoint
  }
}
