import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  path: string
}

/**
 * Command to create a backoffice multimedia video.
 */
export class CreateBackofficeMultimediaVideoCommand extends Command {
  public readonly id: string
  public readonly path: string

  constructor({ id, path }: Params) {
    super()
    this.id = id
    this.path = path
  }
}
