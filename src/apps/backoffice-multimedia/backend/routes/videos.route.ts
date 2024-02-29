import { Uuid } from '@Shared/domain/value-objects/Uuid'
import { type Request, type Router } from 'express'
import multer from 'multer'
import path from 'path'
import { container } from '../dependency-injection'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

export type VideoPostRequest = Request & {
  body: {
    id: string
  }
  file?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}

function registerPostVideo(router: Router): void {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname, '../public'))
    },
    filename: function (_req, _file, cb) {
      cb(null, Uuid.random().value)
    }
  })
  const upload = multer({
    storage,
    fileFilter: function (_req, file, cb) {
      if (file.mimetype !== 'video/mp4') {
        cb(new InvalidArgumentError('Invalid file type, only mp4 is allowed'))
        return
      }
      cb(null, true)
    }
  })
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
