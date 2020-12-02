import { Router } from 'express'

import ListItemsController from '../controllers/ListItemsController'
import CreateItemController from '../controllers/CreateItemController'
import { celebrate, Joi, Segments } from 'celebrate'
import { image } from 'faker'

const router = Router()

const listItemsController = new ListItemsController()
const createItemController = new CreateItemController()

router.get('/', listItemsController.show)
router.post('/', celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    image: Joi.string().required()
  }
}), createItemController.create)

export default router
