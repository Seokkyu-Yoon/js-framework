import { Router as ExpressRouter } from 'express'
import { Renderer } from './adapter'
import { ApiRouter } from './api'

export function Router(modules) {
  return ExpressRouter()
    .use('/api', ApiRouter(modules))
    .get('/*', Renderer('index.html'))
    .use((req, res, next) => {
      const err = new Error('Not found')
      err.httpStatus = 404
      next(err)
    })
    .use((err, req, res, next) => {
      const httpStatus = err?.httpStatus || 500
      const message = err?.message || String(err)
      res.status(httpStatus).send({ message })
    })
}
