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
    const getPoint = await this.repository.findOne(point_id, {
      relations: ['point_items']
    })

    return getPoint
  }

  async listPointsFiltered ({ city, uf, items }:ListPointsFilteredProps): Promise<Point[]> {
    const arrayString = items.toString()

    const pointFiltered = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Point, 'p')
      .innerJoin('point_items', 'pi', 'pi.point_id = p.point_id')
      .where('p.city = :city', { city })
      .andWhere('p.uf = :uf', { uf })
      .andWhere('pi.item_id IN (:items)', { items: arrayString })
      .getRawMany()

    return pointFiltered
  }
}
