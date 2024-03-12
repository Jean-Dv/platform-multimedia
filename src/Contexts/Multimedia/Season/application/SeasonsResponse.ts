import { type Season } from '../domain/Season'

interface SeasonResponse {
  id: string
  serieId: string
  title: string
  releaseYear: number
}

export class SeasonsResponse {
  public readonly seasons: SeasonResponse[]

  constructor(seasons: Season[]) {
    this.seasons = seasons.map((season) => season.toPrimitives())
  }
}
