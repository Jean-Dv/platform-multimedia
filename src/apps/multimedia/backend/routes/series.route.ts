import { type Request, type Response, type Router } from 'express'
import { container } from '../dependency-injection'

export function register(router: Router): void {
  const serieGetController = container.get(
    'Apps.multimedia.controllers.SerieGetController'
  )
  router.get('/multimedia/series', (req: Request, res: Response) =>
    serieGetController.run(req, res)
  )
}
