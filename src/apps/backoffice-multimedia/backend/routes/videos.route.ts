import { Uuid } from '@Shared/domain/value-objects/Uuid'
import { type Router } from 'express'
import multer from 'multer'
import path from 'path'
import { container } from '../dependency-injection'

function registerPostVideo(router: Router): void {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname, '../public'))
    },
    filename: function (_req, _file, cb) {
      cb(null, Uuid.random().value)
    }
  })
  const upload = multer({ storage })
  const controller = container.get(
    'Apps.backoffice-multimedia.controllers.VideoPostController'
  )
  router.post(
    '/videos',
    upload.single('video'),
    controller.run.bind(controller)
  )
}

export function register(router: Router): void {
  registerPostVideo(router)
}
