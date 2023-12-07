import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreatePlaylistCommand } from './CreatePlaylistCommand'
import { type PlaylistCreator } from './PlaylistCreator'
import { type Command } from '@Shared/domain/Command'
import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { UserId } from '@Auth/Shared/domain/User/UserId'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'

export class CreatePlaylistCommandHandler
  implements CommandHandler<CreatePlaylistCommand>
{
  constructor(private readonly playlistCreator: PlaylistCreator) {}

  public subscribedTo(): Command {
    return CreatePlaylistCommand
  }

  public async handle(command: CreatePlaylistCommand): Promise<void> {
    const id = new PlaylistId(command.id)
    const name = new PlaylistName(command.name)
    const userId = new UserId(command.userId)
    const seriesIds = command.seriesIds.map((id: string) => new SerieId(id))
    const moviesIds = command.moviesIds.map((id: string) => new MovieId(id))
    await this.playlistCreator.run({
      id,
      name,
      userId,
      seriesIds,
      moviesIds
    })
  }
}
