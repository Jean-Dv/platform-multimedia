import { type Router } from 'express'
import { body, param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutSeason(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('releaseYear').exists().isNumeric(),
    body('serie').exists().isObject(),
    body('serie.id').isUUID()
  ]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.SeasonPutController'
  )
  router.put(
    '/seasons',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

function registerDeleteSeason(router: Router): void {
  const reqSchema = [param('id').exists().isString().isUUID()]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.SeasonDeleteController'
  )
  router.delete(
    '/seasons/:id',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutSeason(router)
  registerDeleteSeason(router)
}
