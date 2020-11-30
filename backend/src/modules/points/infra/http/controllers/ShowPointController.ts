import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowPointService from '@modules/points/services/ShowPoint/ShowPointService'

export default class ShowPointController {
  async show (request: Request, response: Response): Promise<Response> {
    const { point_id } = request.params

    const showPointService = container.resolve(ShowPointService)

    const { name, image, email, whatsapp, latitude, longitude, city, uf, created_at, updated_at, point_items } = await showPointService.execute({ point_id })
    const items = point_items.map(items => (items.items))

    const returnData = {
      name, image, email, whatsapp, latitude, longitude, city, uf, created_at, updated_at, items
    }

    return response.json(classToClass(returnData))
  }
}
