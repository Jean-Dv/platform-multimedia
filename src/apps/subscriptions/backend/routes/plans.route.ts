import { type Router } from 'express'
import { container } from '../dependency-injection'

function registerGetPlans(router: Router): void {
  const controller = container.get(
    'Apps.subscriptions.controllers.PlansGetController'
  )
  router.get('/plans', controller.run.bind(controller))
}

export function register(router: Router): void {
  registerGetPlans(router)
}
