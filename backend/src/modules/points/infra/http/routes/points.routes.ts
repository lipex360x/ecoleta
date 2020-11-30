import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import CreatePointController from '../controllers/CreatePointController'
import ShowPointController from '../controllers/ShowPointController'

const router = Router()

const createPointController = new CreatePointController()
const showPointController = new ShowPointController()

router.get('/getpoint/:point_id', celebrate({
  [Segments.PARAMS]: {
    point_id: Joi.string().label('Point ID').uuid().required()
  }
}), showPointController.show)

router.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().label('Name').required(),
    image: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  }
}), createPointController.create)

export default router
