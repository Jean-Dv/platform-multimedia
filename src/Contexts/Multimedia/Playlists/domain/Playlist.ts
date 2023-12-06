import { UserId } from '@Auth/Shared/domain/User/UserId'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { PlaylistId } from './PlaylistId'
import { PlaylistName } from './PlaylistName'
import { PlaylistCreatedDomainEvent } from './PlaylistCreatedDomainEvent'

export class Playlist extends AggregateRoot {
  public readonly id: PlaylistId
  public readonly name: PlaylistName
  public readonly userId: UserId
  public readonly seriesIds: SerieId[]
  public readonly moviesIds: MovieId[]

  constructor(
    id: PlaylistId,
    name: PlaylistName,
    userId: UserId,
    seriesIds: SerieId[],
    moviesIds: MovieId[]
  ) {
    super()
    this.id = id
    this.name = name
    this.userId = userId
    this.seriesIds = seriesIds
    this.moviesIds = moviesIds
  }

  public static create(
    id: PlaylistId,
    name: PlaylistName,
    userId: UserId,
    seriesIds: SerieId[],
    moviesIds: MovieId[]
  ): Playlist {
    const playlist = new Playlist(id, name, userId, seriesIds, moviesIds)
    playlist.record(
      new PlaylistCreatedDomainEvent({
        aggregateId: id.value,
        name: name.value,
        userId: userId.value,
        seriesIds: seriesIds.map((id) => id.value),
        moviesIds: moviesIds.map((id) => id.value)
      })
    )
    return playlist
  }

  public static fromPrimitives(plainData: {
    id: string
    name: string
    userId: string
    seriesIds: string[]
    moviesIds: string[]
  }): Playlist {
    return new Playlist(
      new PlaylistId(plainData.id),
      new PlaylistName(plainData.name),
      new UserId(plainData.userId),
      plainData.seriesIds.map((id) => new SerieId(id)),
      plainData.moviesIds.map((id) => new MovieId(id))
    )
  }

  public toPrimitives(): {
    id: string
    name: string
    userId: string
    seriesIds: string[]
    moviesIds: string[]
  } {
    return {
      id: this.id.value,
      name: this.name.value,
      userId: this.userId.value,
      seriesIds: this.seriesIds.map((id) => id.value),
      moviesIds: this.moviesIds.map((id) => id.value)
    }
  }
}
