import { type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutCategory(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('name').exists().isString()
  ]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const isAdminMiddleware = container.get(
    'Apps.multimedia.middlewares.IsAdminMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.CategoryPutController'
  )
  router.put(
    '/multimedia/categories/:id',
    authMiddleware.run.bind(authMiddleware),
    isAdminMiddleware.run.bind(isAdminMiddleware),
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutCategory(router)
}
