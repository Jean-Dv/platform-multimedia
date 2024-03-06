import { type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutPlan(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('name').exists().isString(),
    body('price').exists().isNumeric(),
    body('duration').exists().isNumeric(),
    body('description').exists().isString()
  ]
  const controller = container.get(
    'Apps.subscriptions.controllers.PlanPutController'
  )
  router.put(
    '/plans',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutPlan(router)
}
