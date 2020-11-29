import { Router } from 'express'

import CreatePointController from '../controllers/CreatePointController'

const router = Router()

const createPointController = new CreatePointController()

router.post('/', createPointController.create)

export default router
