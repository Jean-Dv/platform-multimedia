import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status'
import { type ChaptersResponse } from '@Multimedia/Chapter/application/ChaptersResponse'
import { SearchChaptersByCriteriaQuery } from '@Multimedia/Chapter/application/SearchByCriteria/SearchChaptersByCriteriaQuery'

interface FilterType {
  field: string
  operator: string
  value: string
}

/**
 * Represents a controller for getting chapters.
 */
export class ChaptersGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderBy, order, limit, offset } = queryParams

    const query = new SearchChaptersByCriteriaQuery(
      this.parseFilters(filters as unknown as string[]),
      orderBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )

    const response = await this.queryBus.ask<ChaptersResponse>(query)
    res.status(httpStatus.OK).json({
      ok: true,
      data: response.chapters
    })
  }

  /**
   * Parses the filters.
   *
   * @param params - The request parameters.
   * @returns An array of filters parsed to criteria.
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
