import { type Serie } from '../domain/Serie'

export interface SerieResponse {
  id: string
  category: string
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
