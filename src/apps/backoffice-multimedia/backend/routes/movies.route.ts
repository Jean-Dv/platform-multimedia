import { type Router } from 'express'
import { container } from '../dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '.'

function registerPutMovie(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('releaseYear').exists().isNumeric(),
    body('synopsis').exists().isString(),
    body('categories').exists().isArray(),
    body('categories.id').isUUID(),
    body('videoId').exists().isUUID()
  ]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.MoviePutController'
  )
  router.put(
    '/movies',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutMovie(router)
}
