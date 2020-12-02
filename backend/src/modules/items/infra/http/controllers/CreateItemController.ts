import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateItemService from '@modules/items/services/CreateItem/CreateItemService'

export default class CreateItemController {
  async create (request: Request, response: Response): Promise<Response> {
    const { title, image } = request.body

    const createItemService = container.resolve(CreateItemService)

    const createItem = await createItemService.execute({ title, image })

    return response.json(classToClass(createItem))
  }
}
