import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  category: string
  title: string
  releaseDate: Date
  url: string
  duration: number
}

export class CreateMovieCommand extends Command {
  public readonly id: string
  public readonly category: string
  public readonly title: string
  public readonly releaseDate: Date
  public readonly url: string
  public readonly duration: number

  constructor({ id, category, title, releaseDate, url, duration }: Params) {
    super()
    this.id = id
    this.category = category
    this.title = title
    this.releaseDate = releaseDate
    this.url = url
    this.duration = duration
  }
}
