import { type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutRole(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('name').exists().isIn(['admin', 'registered'])
  ]
  const controller = container.get('Apps.auth.controllers.RolePutController')
  router.put(
    '/auth/roles/:id',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutRole(router)
}
