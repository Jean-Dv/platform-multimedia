import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import httpStatus from 'http-status'

export default class StatusGetController implements Controller {
  public async run(_req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).json({
      status: 'OK',
      version: '1.0.0'
    })
  }
}
