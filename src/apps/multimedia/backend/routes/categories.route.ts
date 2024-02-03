import { type Router } from 'express'
import { param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetCategories(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.CategoryGetController'
  )
  router.get('/categories', controller.run.bind(controller))
}

function registerDeleteCategory(router: Router): void {
  const reqSchema = [param('id').exists().isString().isUUID()]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const isAdminMiddleware = container.get(
    'Apps.multimedia.middlewares.IsAdminMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.CategoryDeleteController'
  )
  router.delete(
    '/multimedia/categories/:id',
    authMiddleware.run.bind(authMiddleware),
    isAdminMiddleware.run.bind(isAdminMiddleware),
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerDeleteCategory(router)
  registerGetCategories(router)
}
