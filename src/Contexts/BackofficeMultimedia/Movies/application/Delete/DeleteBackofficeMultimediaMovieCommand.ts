import { Command } from '@Shared/domain/Command'

/**
 * Command for deleting backoffice multimedia movies.
 */
export class DeleteBackofficeMultimediaMovieCommand extends Command {
  public readonly id: string

  constructor({ id }: { id: string }) {
    super()
    this.id = id
  }
}
