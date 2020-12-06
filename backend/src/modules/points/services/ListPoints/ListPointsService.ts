import { inject, injectable } from 'tsyringe'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository from '@modules/points/repositories/interfaces/IPointsRepository'
import AppError from '@shared/errors/AppError'

interface Request{
  city: string
  uf: string
  items: string[]
}

@injectable()
export default class ListPointsService {
  constructor (
    @inject('PointsRepository')
    private repository: IPointsRepository
  ) {}

  async execute ({ city, uf, items }: Request): Promise<Point[]> {
    const getPoint = await this.repository.listPointsFiltered({ city, uf, items })

    if (getPoint.length === 0) throw new AppError('Points not found')

    return getPoint
  }
}
