import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { type Response, type Request } from 'express'
import { FindVideoQuery } from '@Multimedia/Videos/application/Find/FindVideoQuery'
import { type VideoResponse } from '@Multimedia/Videos/application/VideoResponse'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Controller for getting a video.
 */
export class VideoGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = new FindVideoQuery(id)
      const { videoResponse: response } =
        await this.queryBus.ask<VideoResponse>(query)
      res.status(httpStatus.OK).json({
        ok: true,
        data: {
          url: response.url
        }
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).json({
          ok: false,
          error: error.message
        })
        return
      }
      if (error instanceof NotFound) {
        res.status(httpStatus.NOT_FOUND).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
