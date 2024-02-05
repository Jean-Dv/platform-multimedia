import { type Router } from 'express'
import { body } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerPutChapter(router: Router): void {
  const reqSchema = [
    body('id').exists().isString().isUUID(),
    body('title').exists().isString(),
    body('releaseYear').exists().isNumeric(),
    body('season').exists().isObject(),
    body('season.id').isUUID(),
    body('video').exists().isObject(),
    body('video.id').isUUID()
  ]
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.ChapterPutController'
  )
  router.put(
    '/chapters',
    reqSchema,
    validateReqSchema,
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPutChapter(router)
}
