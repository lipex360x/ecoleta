import { inject, injectable } from 'tsyringe'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointsRepository from '@modules/points/repositories/interfaces/IPointsRepository'
import AppError from '@shared/errors/AppError'

interface Request{
  point_id: string
}

@injectable()
export default class ShowPointService {
  constructor (
    @inject('PointsRepository')
    private repository: IPointsRepository
  ) {}

  async execute ({ point_id }: Request): Promise<Point> {
    const getPoint = await this.repository.findById({ point_id })

    if (!getPoint) throw new AppError('Point not found')

    return getPoint
  }
}
