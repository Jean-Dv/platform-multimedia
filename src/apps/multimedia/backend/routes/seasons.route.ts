import { type Router } from 'express'
import { container } from '../dependency-injection'

function registerGetSeasons(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.SeasonGetController'
  )
  router.get('/seasons', controller.run.bind(controller))
}

export function register(router: Router): void {
  registerGetSeasons(router)
}
