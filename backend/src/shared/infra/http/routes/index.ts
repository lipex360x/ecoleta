import { Router } from 'express'

import ItemsRouter from '@modules/items/infra/http/routes/items.routes'
import PointsRouter from '@modules/points/infra/http/routes/points.routes'

const routes = Router()

routes.use('/items', ItemsRouter)
routes.use('/points', PointsRouter)

export default routes
