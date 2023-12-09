import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { SearchChapterByIdQuery } from '@Multimedia/Chapter/application/SearchById/SearchChapterByIdQuery'
import { type ChapterWithPermissionsResponse } from '@Multimedia/Chapter/application/ChapterWithPermissionsResponse'
import { type Request, type Response } from 'express'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { NotFound } from '@Shared/domain/NotFound'

export class ChapterGetByIdController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = new SearchChapterByIdQuery(id)
      const response =
        await this.queryBus.ask<ChapterWithPermissionsResponse>(query)
      res.status(200).json({
        ok: true,
        data: {
          chapter: response.chapterResponse
        }
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(400).json({
          ok: false,
          error: error.message
        })
        return
      }
      if (error instanceof NotFound) {
        res.status(404).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(500).json({
        ok: false
      })
    }
  }
}
