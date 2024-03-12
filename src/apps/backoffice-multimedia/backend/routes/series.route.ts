import { type Router } from 'express'
import { body, param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutSerie(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('releaseYear').exists().isNumeric(),
    body('synopsis').exists().isString(),
    body('categories').exists().isArray()
  ]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.SeriePutController'
  )
  router.put(
    '/series',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

function registerDeleteSerie(router: Router): void {
  const reqSchema = [param('id').exists().isString().isUUID()]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.SerieDeleteController'
  )
  router.delete(
    '/series/:id',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutSerie(router)
  registerDeleteSerie(router)
}
