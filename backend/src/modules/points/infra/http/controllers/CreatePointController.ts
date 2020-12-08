import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreatePointService from '@modules/points/services/CreatePoint/CreatePointService'

export default class CreatePointController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body

    const image = request.file.filename

    const service = container.resolve(CreatePointService)

    const parsedItems = items.split(',')
      .map((item: string) => ({
        item_id: item.trim()
      }))

    console.log(parsedItems)

    const serviceFunction = await service.execute({
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items: parsedItems
    })

    return response.json(classToClass(serviceFunction))
  }
}
