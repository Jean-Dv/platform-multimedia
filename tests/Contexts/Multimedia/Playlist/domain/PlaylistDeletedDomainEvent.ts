import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { PlaylistDeletedDomainEvent } from '@Multimedia/Playlists/domain/PlaylistDeletedDomainEvent'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export class PlaylistDeletedDomainEventMother {
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
  }): PlaylistDeletedDomainEvent {
    return new PlaylistDeletedDomainEvent({
      aggregateId,
      eventId,
      name,
      userId,
      seriesIds,
      moviesIds,
      occurredOn
    })
  }

  public static fromPlaylist(playlist: Playlist): PlaylistDeletedDomainEvent {
    return this.create({
      aggregateId: playlist.id.value,
      name: playlist.name.value,
      userId: playlist.userId.value,
      seriesIds: playlist.seriesIds.map((id: SerieId) => id.value),
      moviesIds: playlist.moviesIds.map((id: MovieId) => id.value)
    })
  }
}
