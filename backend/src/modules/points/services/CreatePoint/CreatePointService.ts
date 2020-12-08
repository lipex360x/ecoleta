import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Point from '@modules/points/infra/typeorm/entities/Point'
import IPointInterface from '@modules/points/repositories/interfaces/IPointsRepository'
import IItemsRepository from '@modules/items/repositories/interfaces/IItemsRepository'
import AppError from '@shared/errors/AppError'

interface ItemsProps {
  item_id: string
}

interface Request{
  name: string
  image: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf : string
  items: ItemsProps[]
}

@injectable()
export default class CreatePointService {
  constructor (
    @inject('PointsRepository')
    private repository: IPointInterface,

    @inject('ItemsRepository')
    private itemRepository: IItemsRepository

  ) {}

  async execute ({ name, image, email, whatsapp, latitude, longitude, city, uf, items }: Request): Promise<Point> {
    const arrayItemsIds = items.map(item => item.item_id)

    const getItems = await this.itemRepository.findAllById({ arrayItemsIds })

    const checkItemsExists = getItems.filter(item => (item))
    if (checkItemsExists.length !== items.length) throw new AppError('One or more items does not exists')

    const serializedItems = getItems.map(item => ({
      item_id: item.item_id,
      title: item.title,
      image: item.image
    }))

    const point = await this.repository.create({
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: serializedItems
    })

    return point
  }
}
