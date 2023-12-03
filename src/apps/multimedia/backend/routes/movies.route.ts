import { type Request, type Response, type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

export function register(router: Router): void {
  const reqSchemaOfCreateMovie = [
    body('id').exists().isString(),
    body('title').exists().isString(),
    body('releaseDate').exists().isISO8601().toDate(),
    body('duration').exists().isNumeric()
  ]
  const moviePutController = container.get(
    'Apps.multimedia.controllers.MoviePutController'
  )
  const movieGetController = container.get(
    'Apps.multimedia.controllers.MovieGetController'
  )
  router.put(
    '/multimedia/movies/:id',
    reqSchemaOfCreateMovie,
    validateReqSchema,
    (req: Request, res: Response) => moviePutController.run(req, res)
  )
  router.get('/multimedia/movies', (req: Request, res: Response) =>
    movieGetController.run(req, res)
  )
}
