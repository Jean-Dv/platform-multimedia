import { Command } from '@Shared/domain/Command'

export class DeleteBackofficeMultimediaChapterCommand extends Command {
  public readonly id: string

  constructor({ id }: { id: string }) {
    super()
    this.id = id
  }
}
