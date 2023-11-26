import { type Request, type Response } from 'express'

/**
 * Interface representing a controller with a `run` method.
 */
export interface Controller {
  /**
   * Executes the controller logic when handling a request.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A Promise that resolves once the controller logic is executed.
   *          If not using async/await, the method may return void.
   */
  run: (req: Request, res: Response) => Promise<void> | void
}
