import { type Command } from '@Shared/domain/Command'

/**
 * Command to delete a serie
 */
export class DeleteBackofficeMultimediaSerieCommand implements Command {
  public readonly id: string

  constructor({ id }: { id: string }) {
    this.id = id
  }
}
