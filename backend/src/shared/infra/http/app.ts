import express from 'express'
import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'
import { errors } from 'celebrate'

import '@shared/containers'
import '@shared/infra/typeorm'

import storageConfig from '@shared/containers/providers/StorageProvider/config/storage.config'
import routerError from '@shared/errors/RouterError'
import routes from '@shared/infra/http/routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(storageConfig.tmpFolder))

app.use(errors())
app.use(routerError)

export default app
