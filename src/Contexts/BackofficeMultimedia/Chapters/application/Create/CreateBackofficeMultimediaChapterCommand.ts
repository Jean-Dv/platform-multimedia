import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseYear: number
  season: string
  video: string
}

/**
 * Command to create a backoffice multimedia chapter.
 */
export class CreateBackofficeMultimediaChapterCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseYear: number
  public readonly season: string
  public readonly video: string

  constructor({ id, title, releaseYear, season, video }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.season = season
    this.video = video
  }
}
