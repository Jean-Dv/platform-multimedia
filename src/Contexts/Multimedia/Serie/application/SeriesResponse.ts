import { type Serie } from '../domain/Serie'

export interface SerieResponse {
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
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
