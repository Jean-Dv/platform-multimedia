import { type Request, type Response, type Router } from 'express'
import { body } from 'express-validator'
import { validateReqSchema } from '.'
import { container } from '../dependency-injection'

export function register(router: Router): void {
  const reqSchema = [
    body('firstName').exists().isString(),
    body('lastName').exists().isString(),
    body('email').exists().isEmail(),
    body('password').exists().isString(),
    body('repeatPassword')
      .exists()
      .isString()
      .custom((value, { req }) => {
        return value === req.body.password
      })
  ]
  const userPutController = container.get(
    'Apps.auth.controllers.UserPutController'
  )
  router.put(
    '/auth/register',
    reqSchema,
    validateReqSchema,
    (req: Request, res: Response) => userPutController.run(req, res)
  )
}
