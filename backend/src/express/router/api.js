import { Router as ExpressRouter } from 'express'
import { ControllerAdapter } from './adapter'

export function ApiRouter(modules) {
  const { userModule } = modules

  return ExpressRouter()
    .get('/users', ControllerAdapter(userModule.controller.all))
    .get('/users/:id', ControllerAdapter(userModule.controller.getById))
    .post('/users', ControllerAdapter(userModule.controller.signup))
    .delete('/users/:id', ControllerAdapter(userModule.controller.signout))

    .use((req, res, next) => {
      const err = new Error('Not found')
      err.httpStatus = 404
      next(err)
    })
}
