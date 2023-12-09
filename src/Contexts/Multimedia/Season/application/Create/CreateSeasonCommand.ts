import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  serieId: string
  title: string
  releaseDate: Date
}

export class CreateSeasonCommand extends Command {
  public readonly id: string
  public readonly serieId: string
  public readonly title: string
  public readonly releaseDate: Date

  constructor({ id, serieId, title, releaseDate }: Params) {
    super()
    this.id = id
    this.serieId = serieId
    this.title = title
    this.releaseDate = releaseDate
  }
}
