import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { SearchSeasonsByCriteriaQuery } from '@Multimedia/Season/application/SearchByCriteria/SearchSeasonsByCriteriaQuery'
import { type Request, type Response } from 'express'
import { type SeasonsResponse } from '@Multimedia/Season/application/SeasonsResponse'
import httpStatus from 'http-status'

interface FilterType {
  field: string
  operator: string
  value: string
}

/**
 * Controller for getting seasons.
 */
export class SeasonGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderBy, order, limit, offset } = queryParams

    const query = new SearchSeasonsByCriteriaQuery(
      this.parseFilters(filters as unknown as string[]),
      orderBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )

    const response = await this.queryBus.ask<SeasonsResponse>(query)
    res.status(httpStatus.OK).json({
      ok: true,
      data: response.seasons
    })
  }

  /**
   * This method parses the filters from the query params.
   *
   * @param params - The filters to parse
   * @returns An array of maps with the filters
   */
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
