import { type Router } from 'express'
import { body } from 'express-validator'
import { validateReqSchema } from '.'
import { container } from '../dependency-injection'

function registerPutSeason(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('serieId').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('releaseDate').exists().isISO8601().toDate()
  ]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const isAdminMiddleware = container.get(
    'Apps.multimedia.middlewares.IsAdminMiddleware'
  )
  const seasonPutController = container.get(
    'Apps.multimedia.controllers.SeasonPutController'
  )
  router.put(
    '/multimedia/seasons/:id',
    authMiddleware.run.bind(authMiddleware),
    isAdminMiddleware.run.bind(isAdminMiddleware),
    reqSchema,
    validateReqSchema,
    seasonPutController.run.bind(seasonPutController)
  )
}

export function register(router: Router): void {
  registerPutSeason(router)
}
