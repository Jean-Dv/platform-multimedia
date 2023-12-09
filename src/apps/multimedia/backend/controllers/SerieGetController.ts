import { type Request, type Response } from 'express'
import { type Controller } from './Controller'
import { SearchSeriesByCriteriaQuery } from '@Multimedia/Serie/application/SearchByCriteria/SearchSeriesByCriteriaQuery'
import httpStatus from 'http-status'
import {
  type SerieResponse,
  type SeriesResponse
} from '@Multimedia/Serie/application/SeriesResponse'
import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Nullable } from '@Shared/domain/Nullable'
import { SearchSeasonsByCriteriaQuery } from '@Multimedia/Season/application/SearchByCriteria/SearchSeasonsByCriteriaQuery'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'
import { type SeasonsResponse } from '@Multimedia/Season/application/SeasonsResponse'
import { SearchChaptersByCriteriaQuery } from '@Multimedia/Chapter/application/SearchByCriteria/SearchChaptersByCriteriaQuery'
import { type ChaptersResponse } from '@Multimedia/Chapter/application/ChaptersResponse'

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

    const filtersParsed = this.parseFilters(filters as unknown as string[])
    const serieIdFilter = this.getFilterBySerieId(filtersParsed)

    if (serieIdFilter !== undefined && serieIdFilter !== null) {
      const serieId = serieIdFilter.get('value') as string
      const serie = await this.getSerieById(serieId)
      const seasons = await this.getSeasonsOfSerie(serieId)
      const response = {
        ok: true,
        data: {
          id: serie.id,
          title: serie.title,
          category: serie.category,
          seasons: await Promise.all(
            seasons.seasons.map(async (season) => {
              const chapters = await this.getChaptersOfSeason(season.id)
              return {
                id: season.id,
                title: season.title,
                chapters: chapters.chapters.map((chapter) => {
                  return {
                    id: chapter.id,
                    title: chapter.title,
                    duration: chapter.duration,
                    releaseDate: chapter.releaseDate
                  }
                }),
                releaseDate: season.releaseDate
              }
            })
          ),
          releaseDate: serie.releaseDate
        }
      }
      res.status(httpStatus.OK).json(response)
      return
    }

    const query = new SearchSeriesByCriteriaQuery(
      filtersParsed,
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

  private getFilterBySerieId(
    filters: Array<Map<string, string>>
  ): Nullable<Map<string, string>> {
    return filters.find((filter: Map<string, string>) => {
      return filter.get('field') === 'id' && filter.get('operator') === '='
    })
  }

  private async getSerieById(serieId: string): Promise<SerieResponse> {
    const filterById = new Map<string, string>([
      ['field', 'id'],
      ['operator', '='],
      ['value', serieId]
    ])
    const filters = new Array<Map<string, string>>(filterById)
    const query = new SearchSeriesByCriteriaQuery(filters)
    const response = await this.queryBus.ask<SeriesResponse>(query)
    return response.series[0]
  }

  private async getSeasonsOfSerie(serieId: string): Promise<SeasonsResponse> {
    const filterBySerieId = new Map<string, string>([
      ['field', 'serieId'],
      ['operator', '='],
      ['value', serieId]
    ])
    const filters = new Array<Map<string, string>>(filterBySerieId)
    const orderBy = 'releaseDate'
    const orderType = OrderTypes.ASC
    const query = new SearchSeasonsByCriteriaQuery(filters, orderBy, orderType)
    const response = await this.queryBus.ask<SeasonsResponse>(query)
    return response
  }

  private async getChaptersOfSeason(
    seasonId: string
  ): Promise<ChaptersResponse> {
    const filterBySeasonId = new Map<string, string>([
      ['field', 'seasonId'],
      ['operator', '='],
      ['value', seasonId]
    ])
    const filters = new Array<Map<string, string>>(filterBySeasonId)
    const orderBy = 'releaseDate'
    const orderType = OrderTypes.ASC
    const query = new SearchChaptersByCriteriaQuery(filters, orderBy, orderType)
    const response = await this.queryBus.ask<ChaptersResponse>(query)
    return response
  }
}
