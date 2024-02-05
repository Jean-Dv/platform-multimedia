import { type Router } from 'express'
import { param } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerGetChapters(router: Router): void {
  const controller = container.get(
    'Apps.multimedia.controllers.ChaptersGetController'
  )
  router.get('/chapters', controller.run.bind(controller))
}

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

export function register(router: Router): void {
  registerGetChapterById(router)
  registerGetChapters(router)
}
