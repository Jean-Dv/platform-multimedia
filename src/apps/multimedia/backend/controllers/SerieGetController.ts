import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { SearchSeriesByCriteriaQuery } from '@Multimedia/Serie/application/SearchByCriteria/SearchSeriesByCriteriaQuery'
import httpStatus from 'http-status'
import { type SeriesResponse } from '@Multimedia/Serie/application/SeriesResponse'
import { type QueryBus } from '@Shared/domain/QueryBus'

interface FilterType {
  field: string
  operator: string
  value: string
}

export class SerieGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderBy, order, limit, offset } = queryParams

    const query = new SearchSeriesByCriteriaQuery(
      this.parseFilters(filters as unknown as string[]),
      orderBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )

    const response = await this.queryBus.ask<SeriesResponse>(query)
    res.status(httpStatus.OK).json({
      ok: true,
      data: response.series
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
