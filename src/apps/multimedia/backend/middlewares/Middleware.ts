import { type NextFunction, type Request, type Response } from 'express'

/**
 * Interface representing a middleware with a `run` method.
 */
export interface Middleware {
  /**
   * Executes the middleware logic when handling a request.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The Express next function.
   */
  run: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
}
