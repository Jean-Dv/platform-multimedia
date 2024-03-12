import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
}

export class DeleteMovieCommand extends Command {
  public readonly id: string

  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
