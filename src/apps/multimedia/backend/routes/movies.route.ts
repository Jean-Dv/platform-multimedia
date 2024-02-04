import { type Router } from 'express'
import { param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetMovies(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.MovieGetController'
  )
  router.get('/movies', controller.run.bind(controller))
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
    authMiddleware.run.bind(authMiddleware),
    reqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerGetMovies(router)
  registerGetMovieById(router)
}
