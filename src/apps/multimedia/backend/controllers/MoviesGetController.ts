import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { SearchMoviesByCriteriaQuery } from '@Multimedia/Movies/application/SearchByCriteria/SearchMoviesByCriteriaQuery'
import { type MoviesResponse } from '@Multimedia/Movies/application/MoviesResponse'
import httpStatus from 'http-status'

interface FilterType {
  field: string
  operator: string
  value: string
}

export class MoviesGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderBy, order, limit, offset } = queryParams

    const query = new SearchMoviesByCriteriaQuery(
      this.parseFilters(filters as unknown as string[]),
      orderBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )

    const response = await this.queryBus.ask<MoviesResponse>(query)
    res.status(httpStatus.OK).json({
      ok: true,
      data: response.movies
    })
  }

  private parseFilters(params: string[]): Array<Map<string, string>> {
    if (params == null) return new Array<Map<string, string>>()

    return params.map((filter: string) => {
      const filterObject: FilterType = JSON.parse(filter.replaceAll("'", '"'))
      const field = filterObject.field
      const operator = filterObject.operator
      const value = filterObject.value

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ])
    })
  }
}
