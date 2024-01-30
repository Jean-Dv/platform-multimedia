import { type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutCategory(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('name').exists().isString()
  ]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.CategoryPutController'
  )
  router.put(
    '/categories',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutCategory(router)
}
