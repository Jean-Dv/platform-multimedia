import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { SearchPlansByCriteriaQuery } from '@Subscriptions/Plans/application/SearchByCriteria/SearchPlansByCriteriaQuery'
import { type PlansResponse } from '@Subscriptions/Plans/application/PlansResponse'
import httpStatus from 'http-status'

interface FilterType {
  field: string
  operator: string
  value: string
}

/**
 * Controller for getting the plans.
 */
export class PlansGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    const { query: queryParams } = req
    const { filters, orderyBy, order, limit, offset } = queryParams

    const query = new SearchPlansByCriteriaQuery(
      this.parseFilters(filters as unknown as string[]),
      orderyBy as string,
      order as string,
      limit != null ? Number(limit) : undefined,
      offset != null ? Number(offset) : undefined
    )

    const response = await this.queryBus.ask<PlansResponse>(query)
    res.status(httpStatus.OK).json({
      ok: true,
      data: response.plans
    })
  }

  /**
   * Parses the filters from the query parameters.
   *
   * @param params The filters from the query parameters.
   * @returns The parsed filters.
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
