import { type Router } from 'express'
import { param } from 'express-validator'
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
    authMiddleware.run,
    reqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerGetChapterById(router)
}
