import 'dotenv/config'
import 'reflect-metadata'
import 'express-async-errors'
import path from 'path'

import express, { NextFunction, Request, Response } from 'express'
import { errors } from 'celebrate'

import '@shared/containers'
import routes from '@shared/infra/http/routes'
import connectDB from '@shared/infra/typeorm'

import AppError from '@shared/errors/AppError'
connectDB()

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', '..', '..', '..', 'uploads')))
app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  console.error(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

export default app
