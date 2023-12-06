import { type MovieWithPermissionResponse } from '@Multimedia/Movies/application/MovieWithPermissionResponse'
import { SearchMovieByIdQuery } from '@Multimedia/Movies/application/SearchById/SearchMovieByIdQuery'
import { NotFound } from '@Shared/domain/NotFound'
import { type QueryBus } from '@Shared/domain/QueryBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { type Request, type Response } from 'express'
import { type Controller } from './Controller'

export class MovieGetByIdController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = new SearchMovieByIdQuery(id)
      const response =
        await this.queryBus.ask<MovieWithPermissionResponse>(query)
      res.status(200).json({
        ok: true,
        data: {
          movie: response.movie
        }
      })
    } catch (error) {
      console.log(error)
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
      res.status(500).json({
        ok: false
      })
    }
  }
}
