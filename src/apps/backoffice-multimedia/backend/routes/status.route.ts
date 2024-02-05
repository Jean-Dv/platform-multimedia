import { type Router } from 'express'
import { container } from '../dependency-injection'

function registerGetStatus(router: Router): void {
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.StatusGetController'
  )
  router.get('/status', controller.run.bind(controller))
}

export function register(router: Router): void {
  registerGetStatus(router)
}
