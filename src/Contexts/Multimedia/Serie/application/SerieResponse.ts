import { type Serie } from '../domain/Serie'

export class SerieResponse {
  public readonly id: string
  public readonly category: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor(serie: Serie) {
    this.id = serie.id.value
    this.category = serie.category.value
    this.title = serie.title.value
    this.releaseDate = serie.releaseDate.value
  }
}
