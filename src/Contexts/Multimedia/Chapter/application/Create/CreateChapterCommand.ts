import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  seasonId: string
  title: string
  duration: number
  releaseDate: Date
}

export class CreateChapterCommand extends Command {
  public readonly id: string
  public readonly seasonId: string
  public readonly title: string
  public readonly duration: number
  public readonly releaseDate: Date

  constructor({ id, seasonId, title, duration, releaseDate }: Params) {
    super()
    this.id = id
    this.seasonId = seasonId
    this.title = title
    this.duration = duration
    this.releaseDate = releaseDate
  }
}
