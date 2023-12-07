import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeletePlaylistCommand } from './DeletePlaylistCommand'
import { type PlaylistDeletor } from './PlaylistDeletor'
import { type Command } from '@Shared/domain/Command'
import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'

export class DeletePlaylistCommandHandler
  implements CommandHandler<DeletePlaylistCommand>
{
  constructor(private readonly playlistDeleter: PlaylistDeletor) {}

  public subscribedTo(): Command {
    return DeletePlaylistCommand
  }

  public async handle(command: DeletePlaylistCommand): Promise<void> {
    const id = new PlaylistId(command.id)
    await this.playlistDeleter.run(id)
  }
}
