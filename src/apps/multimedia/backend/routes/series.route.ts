import { type Request, type Response, type Router } from 'express'
import { container } from '../dependency-injection'

export function registerGetSeries(router: Router): void {
  const serieGetController = container.get(
    'Apps.multimedia.controllers.SerieGetController'
  )
  router.get('/series', (req: Request, res: Response) =>
    serieGetController.run(req, res)
  )
}

export function register(router: Router): void {
  registerGetSeries(router)
}
