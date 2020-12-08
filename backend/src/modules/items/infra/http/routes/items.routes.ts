import { Router } from 'express'

import ListItemsController from '../controllers/ListItemsController'
import CreateItemController from '../controllers/CreateItemController'
import { celebrate, Joi, Segments } from 'celebrate'

import multer from 'multer'

import storageConfig from '@shared/containers/providers/StorageProvider/config/storage.config'

const router = Router()
const upload = multer(storageConfig)

const listItemsController = new ListItemsController()
const createItemController = new CreateItemController()

router.get('/', listItemsController.show)
router.post('/', upload.single('image'), celebrate({
  [Segments.BODY]: {
    title: Joi.string().required()
  }
}), createItemController.create)

export default router
