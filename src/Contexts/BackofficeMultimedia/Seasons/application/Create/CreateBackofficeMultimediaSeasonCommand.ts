import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseYear: number
  serie: string
}

/**
 * Command to create a backoffice multimedia season.
 */
export class CreateBackofficeMultimediaSeasonCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseYear: number
  public readonly serie: string

  constructor({ id, title, releaseYear, serie }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.serie = serie
  }
}
