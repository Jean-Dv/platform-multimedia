import { type Router } from 'express'
import { body, param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetMovies(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.MovieGetController'
  )
  router.get('/multimedia/movies', controller.run.bind(controller))
}

function registerPutMovie(router: Router): void {
  const reqSchema = [
    body('id').exists().isString(),
    body('title').exists().isString(),
    body('releaseDate').exists().isISO8601().toDate(),
    body('duration').exists().isNumeric()
  ]
  const controller = container.get(
    'Apps.multimedia.controllers.MoviePutController'
  )
  router.put(
    '/multimedia/movies/:id',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

function registerGetMovieById(router: Router): void {
  const reqSchema = [param('id').isUUID()]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.MovieGetByIdController'
  )
  router.get(
    '/multimedia/movies/:id',
    reqSchema,
    validateReqSchema,
    authMiddleware.run,
    reqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerGetMovies(router)
  registerPutMovie(router)
  registerGetMovieById(router)
}
