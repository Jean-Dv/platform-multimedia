import { SerieResponse } from '@Multimedia/Serie/application/SerieResponse'
import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'

export class SearchSerieByIdResponseMother {
  public static create(serie: Serie): SerieResponse {
    return new SerieResponse(serie)
  }

  public static invalid(serie: Serie): SerieNotFound {
    return new SerieNotFound(`Serie with id ${serie.id.value} not found`)
  }
}
