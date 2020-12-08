import { Repository, getRepository, getConnection } from 'typeorm'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository, { CreateProps, FindByIdProps, ListPointsFilteredProps } from '@modules/points/repositories/interfaces/IPointsRepository'

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

  async findById ({ point_id }:FindByIdProps): Promise<Point> {
    const getPoint = this.repository.findOne(point_id, {
      relations: ['point_items']
    })

    return getPoint
  }

  async listPointsFiltered ({ city, uf, items }:ListPointsFilteredProps): Promise<Point[]> {
    const pivot = await getConnection().manager.query(
      `
        select * from point_items pi 
        inner join points p ON pi.point_id = p.point_id 
        inner join items i ON i.item_id = pi.item_id 
        where p.city = '${String(city)}' 
        and p.uf = '${String(uf)}' 
        and i.item_id in ('${items}')
      `
    )

    return pivot
  }
}
