import { Router } from 'express'

import ListItemsController from '../controllers/ListItemsController'

const router = Router()

const listItemsController = new ListItemsController()

router.get('/', listItemsController.show)

export default router
