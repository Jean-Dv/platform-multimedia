import { type Router } from 'express'
import { container } from '../dependency-injection'

function registerGetVideo(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.VideoGetController'
  )
  router.get('/videos/:id', controller.run.bind(controller))
}

export function register(router: Router): void {
  registerGetVideo(router)
}
