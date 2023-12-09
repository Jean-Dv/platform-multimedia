import { type Router } from 'express'
import { body, param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetChapterById(router: Router): void {
  const reqSchema = [param('id').isUUID()]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.ChapterGetByIdController'
  )
  router.get(
    '/multimedia/chapters/:id',
    reqSchema,
    validateReqSchema,
    authMiddleware.run.bind(authMiddleware),
    controller.run.bind(controller)
  )
}

function registerPutChapter(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('seasonId').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('duration').exists().isNumeric(),
    body('releaseDate').exists().isISO8601().toDate(),
    body('url').exists().isString()
  ]
  const authMiddleware = container.get(
    'Apps.multimedia.middlewares.AuthenticateMiddleware'
  )
  const isAdminMiddleware = container.get(
    'Apps.multimedia.middlewares.IsAdminMiddleware'
  )
  const controller = container.get(
    'Apps.multimedia.controllers.ChapterPutController'
  )
  router.put(
    '/multimedia/chapters/:id',
    authMiddleware.run.bind(authMiddleware),
    isAdminMiddleware.run.bind(isAdminMiddleware),
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerGetChapterById(router)
  registerPutChapter(router)
}
