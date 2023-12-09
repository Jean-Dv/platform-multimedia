import { type Request, type Response, type Router } from 'express'
import { container } from '../dependency-injection'
import { body } from 'express-validator'
import { validateReqSchema } from '.'

export function registerPutSerie(router: Router): void {
  const reqSchema = [
    body('id').exists().isString(),
    body('category').exists().isString(),
    body('title').exists().isString(),
    body('releaseDate').exists().isISO8601().toDate()
  ]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const isAdminMiddleware = container.get(
    'Apps.multimedia.middlewares.IsAdminMiddleware'
  )
  const seriePutController = container.get(
    'Apps.multimedia.controllers.SeriePutController'
  )
  router.put(
    '/multimedia/series/:id',
    authMiddleware.run.bind(authMiddleware),
    isAdminMiddleware.run.bind(isAdminMiddleware),
    reqSchema,
    validateReqSchema,
    seriePutController.run.bind(seriePutController)
  )
}

export function registerGetSeries(router: Router): void {
  const serieGetController = container.get(
    'Apps.multimedia.controllers.SerieGetController'
  )
  router.get('/multimedia/series', (req: Request, res: Response) =>
    serieGetController.run(req, res)
  )
}

export function register(router: Router): void {
  registerPutSerie(router)
  registerGetSeries(router)
}
