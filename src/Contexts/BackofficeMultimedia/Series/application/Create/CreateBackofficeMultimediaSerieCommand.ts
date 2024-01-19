import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  title: string
  releaseYear: number
  synopsis: string
  categories: string[]
}

/**
 * Command to create a backoffice multimedia serie.
 */
export class CreateBackofficeMultimediaSerieCommand extends Command {
  public readonly id: string
  public readonly title: string
  public readonly releaseYear: number
  public readonly synopsis: string
  public readonly categories: string[]

  constructor({ id, title, releaseYear, synopsis, categories }: Params) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
  }
}
