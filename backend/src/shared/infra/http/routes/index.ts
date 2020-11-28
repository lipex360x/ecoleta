import { Router } from 'express'

import ItemsRouter from '@modules/items/infra/http/routes/items.routes'

const routes = Router()

routes.use('/items', ItemsRouter)

export default routes
