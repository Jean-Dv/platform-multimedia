import { type Request, type Response, type Router } from 'express'
import { query } from 'express-validator'
import { container } from '../dependency-injection'
import { validateReqSchema } from '.'

function registerAccessTokenRoute(router: Router): void {
  const reqSchema = [query('refreshToken').exists().isString()]
  const accessTokenGetController = container.get(
    'Apps.auth.controllers.AccessTokenGetController'
  )
  router.get(
    '/token/access',
    reqSchema,
    validateReqSchema,
    (req: Request, res: Response) => accessTokenGetController.run(req, res)
  )
}

export function register(router: Router): void {
  registerAccessTokenRoute(router)
}
