import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListPointsService from '@modules/points/services/ListPoints/ListPointsService'

export default class ListPointsController {
  async index (request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map(item => String(item.trim()))

    const listPointsService = container.resolve(ListPointsService)

    const listPoints = await listPointsService.execute({ city, uf, items: parsedItems })

    return response.json(classToClass(listPoints))
  }
}
