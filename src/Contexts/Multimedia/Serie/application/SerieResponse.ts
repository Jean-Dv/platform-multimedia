import { type Serie } from '../domain/Serie'

export class SerieResponse {
  public readonly id: string
  public readonly title: string
  public readonly releaseYear: number
  public readonly synopsis: string
  public readonly categories: string[]

  constructor(serie: Serie) {
    this.id = serie.id.value
    this.title = serie.title.value
    this.releaseYear = serie.releaseYear.value
    this.synopsis = serie.synopsis.value
    this.categories = serie.categories.map((category) => category.value)
  }
}
