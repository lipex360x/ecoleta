import { inject, injectable } from 'tsyringe'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IItemsRepository from '@modules/items/repositories/interfaces/IItemsRepository'
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
    private repository: IPointsRepository,

    @inject('ItemsRepository')
    private itemRepository: IItemsRepository
  ) {}

  async execute ({ city, uf, items }: Request): Promise<Point[]> {
    const getItems = await this.itemRepository.findAllById({ arrayItemsIds: items })

    const arrayItems = getItems.filter(item => (item))

    if (arrayItems.length === 0) throw new AppError('Items not found')

    const getPoint = await this.repository.listPointsFiltered({ city, uf, items })

    if (getPoint.length === 0) throw new AppError('Points not found')

    return getPoint
  }
}
