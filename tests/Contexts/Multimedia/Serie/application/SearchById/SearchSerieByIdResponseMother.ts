import { SerieResponse } from '@Multimedia/Serie/application/SerieResponse'
import { type Serie } from '@Multimedia/Serie/domain/Serie'

export class SearchSerieByIdResponseMother {
  public static create(serie: Serie): SerieResponse {
    return new SerieResponse(serie)
  }
}
