import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseDate: Date
}

export class CreateSerieCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor({ id, title, releaseDate }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseDate = releaseDate
  }
}
