import { type Router } from 'express'
import { body, param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetPlaylists(router: Router): void {
  const reqSchema = [param('userId').exists().isString().isUUID()]
  const middleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.PlaylistsGetController'
  )
  router.get(
    '/multimedia/playlists/:userId',
    middleware.run.bind(middleware),
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

function registerPutPlaylist(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('name').exists().isString(),
    body('userId').exists().isString().isUUID(),
    body('series').exists().isArray(),
    body('movies').exists().isArray()
  ]
  const middleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.PlaylistPutController'
  )
  router.put(
    '/multimedia/playlists/:id',
    reqSchema,
    validateReqSchema,
    middleware.run.bind(middleware),
    controller.run.bind(controller)
  )
}

function registerDeletePlaylist(router: Router): void {
  const reqSchema = [param('id').exists().isString().isUUID()]
  const middleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.PlaylistDeleteController'
  )
  router.delete(
    '/multimedia/playlist/:id',
    reqSchema,
    validateReqSchema,
    middleware.run.bind(middleware),
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutPlaylist(router)
  registerDeletePlaylist(router)
  registerGetPlaylists(router)
}
