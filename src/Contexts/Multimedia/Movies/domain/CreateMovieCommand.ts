import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseDate: Date
  duration: number
}

export class CreateMovieCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseDate: Date
  public readonly duration: number

  constructor({ id, title, releaseDate, duration }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseDate = releaseDate
    this.duration = duration
  }
}
