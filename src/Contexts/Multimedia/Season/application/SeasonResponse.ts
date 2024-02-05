import { type Season } from '../domain/Season'

export class SeasonResponse {
  public readonly id: string
  public readonly serieId: string
  public readonly title: string
  public readonly releaseYear: number

  constructor(season: Season) {
    this.id = season.id.value
    this.serieId = season.serieId.value
    this.title = season.title.value
    this.releaseYear = season.releaseYear.value
  }
}
