import { Command } from '@Shared/domain/Command'

/**
 * Command for deleting backoffice multimedia seasons.
 */
export class DeleteBackofficeMultimediaSeasonCommand extends Command {
  public readonly id: string

  constructor({ id }: { id: string }) {
    super()
    this.id = id
  }
}
