import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreatePointService from '@modules/points/services/CreatePoint/CreatePointService'

export default class CreatePointController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, image, email, whatsapp, latitude, longitude, city, uf, items } = request.body

    const service = container.resolve(CreatePointService)

    const serviceFunction = await service.execute({ name, image, email, whatsapp, latitude, longitude, city, uf, items })

    return response.json(classToClass(serviceFunction))
  }
}
