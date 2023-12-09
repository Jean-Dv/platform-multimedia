import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  category: string
  title: string
  releaseDate: Date
}

export class CreateSerieCommand extends Command {
  public readonly id: string
  public readonly category: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor({ id, category, title, releaseDate }: Params) {
    super()
    this.id = id
    this.category = category
    this.title = title
    this.releaseDate = releaseDate
  }
}
