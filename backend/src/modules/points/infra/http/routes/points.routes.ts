import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'

import storageConfig from '@shared/containers/providers/StorageProvider/config/storage.config'

import CreatePointController from '../controllers/CreatePointController'
import ListPointsController from '../controllers/ListPointsController'
import ShowPointController from '../controllers/ShowPointController'

const router = Router()
const upload = multer(storageConfig)

const createPointController = new CreatePointController()
const listPointsController = new ListPointsController()
const showPointController = new ShowPointController()

router.get('/getpoint/:point_id', celebrate({
  [Segments.PARAMS]: {
    point_id: Joi.string().label('Point ID').uuid().required()
  }
}), showPointController.show)

router.get('/getpoints', listPointsController.index)

router.post('/', upload.single('image'), celebrate({
  [Segments.BODY]: {
    name: Joi.string().label('Name').required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
    items: Joi.string().required()
  }
}, {
  abortEarly: false
}), createPointController.create)

export default router
