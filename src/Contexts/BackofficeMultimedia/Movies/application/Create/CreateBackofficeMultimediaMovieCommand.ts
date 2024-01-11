import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseYear: number
  synopsis: string
}

/**
 * Command to create a backoffice multimedia movie.
 */
export class CreateBackofficeMultimediaMovieCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseYear: number
  public readonly synopsis: string

  constructor({ id, title, releaseYear, synopsis }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
  }
}
