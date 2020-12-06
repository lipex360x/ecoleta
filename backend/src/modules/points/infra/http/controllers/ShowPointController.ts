import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowPointService from '@modules/points/services/ShowPoint/ShowPointService'

export default class ShowPointController {
  async show (request: Request, response: Response): Promise<Response> {
    const { point_id } = request.params

    const showPointService = container.resolve(ShowPointService)

    const getPoint = await showPointService.execute({ point_id })

    const { name, image, email, whatsapp, latitude, longitude, city, uf, created_at, updated_at, point_items } = getPoint

    const getItems = point_items.map(point_item => (point_item.items))

    const returnData = {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      created_at,
      updated_at,
      getItems
    }

    return response.json(classToClass(returnData))
  }
}
