import { SeriesResponse } from '@Multimedia/Serie/application/SeriesResponse'
import { type Serie } from '@Multimedia/Serie/domain/Serie'

export class SearchSeriesByCriteriaResponseMother {
  public static create(series: Serie[]): SeriesResponse {
    return new SeriesResponse(series)
  }
}
