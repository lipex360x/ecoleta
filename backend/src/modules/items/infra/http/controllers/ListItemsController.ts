import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListItemsService from '@modules/items/services/ListItems/ListItemsService'

export default class ListItemsController {
  async show (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListItemsService)

    const listItemService = await service.execute()

    return response.json(classToClass(listItemService))
  }
}
