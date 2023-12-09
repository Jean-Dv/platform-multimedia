import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  name: string
  userId: string
  seriesIds: string[]
  moviesIds: string[]
}

export class CreatePlaylistCommand extends Command {
  public readonly id: string
  public readonly name: string
  public readonly userId: string
  public readonly seriesIds: string[]
  public readonly moviesIds: string[]

  constructor({ id, name, userId, seriesIds, moviesIds }: Params) {
    super()
    this.id = id
    this.name = name
    this.userId = userId
    this.seriesIds = seriesIds
    this.moviesIds = moviesIds
  }
}
