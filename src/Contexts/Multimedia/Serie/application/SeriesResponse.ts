import { type Serie } from '../domain/Serie'

interface SerieResponse {
  id: string
  title: string
  releaseDate: Date
}

/**
 * Represents a response containing a list of series.
 */
export class SeriesResponse {
  public readonly series: SerieResponse[]

  constructor(series: Serie[]) {
    this.series = series.map((serie) => serie.toPrimitives())
  }
}
