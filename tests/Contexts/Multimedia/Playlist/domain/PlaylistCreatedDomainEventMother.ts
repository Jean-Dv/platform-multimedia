import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { PlaylistCreatedDomainEvent } from '@Multimedia/Playlists/domain/PlaylistCreatedDomainEvent'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export class PlaylistCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    name,
    userId,
    seriesIds,
    moviesIds,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    name: string
    userId: string
    seriesIds: string[]
    moviesIds: string[]
    occurredOn?: Date
  }): PlaylistCreatedDomainEvent {
    return new PlaylistCreatedDomainEvent({
      aggregateId,
      eventId,
      name,
      userId,
      seriesIds,
      moviesIds,
      occurredOn
    })
  }

  public static fromPlaylist(playlist: Playlist): PlaylistCreatedDomainEvent {
    return this.create({
      aggregateId: playlist.id.value,
      name: playlist.name.value,
      userId: playlist.userId.value,
      seriesIds: playlist.seriesIds.map((id: SerieId) => id.value),
      moviesIds: playlist.moviesIds.map((id: MovieId) => id.value)
    })
  }
}
