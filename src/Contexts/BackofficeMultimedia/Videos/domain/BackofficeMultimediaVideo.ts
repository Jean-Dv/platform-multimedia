import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaVideoPath } from './BackofficeMultimediaVideoPath'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaVideoCreatedDomainEvent } from './BackofficeMultimediaVideoCreatedDomainEvent'

/**
 * BackofficeMultimediaVideo is an aggregate root entity representing a video in the backoffice.
 */
export class BackofficeMultimediaVideo extends AggregateRoot {
  public readonly id: BackofficeMultimediaVideoId
  public readonly path: BackofficeMultimediaVideoPath

  constructor(
    id: BackofficeMultimediaVideoId,
    path: BackofficeMultimediaVideoPath
  ) {
    super()
    this.id = id
    this.path = path
  }

  /**
   * Creates a new backoffice video.
   *
   * @param id - The unique identifier for the video.
   * @param path - The path of the video.
   * @returns An instance of the created backoffice video.
   */
  public static create(
    id: BackofficeMultimediaVideoId,
    path: BackofficeMultimediaVideoPath
  ): BackofficeMultimediaVideo {
    const video = new BackofficeMultimediaVideo(id, path)
    video.record(
      new BackofficeMultimediaVideoCreatedDomainEvent({
        aggregateId: id.value,
        path: path.value
      })
    )
    return video
  }

  /**
   * Create a new BackofficeMultimediaVideo from primitives.
   *
   * @param plainData- The plain object containing the video information.
   * @returns A new instance of the BackofficeMultimediaVideo entity.
   */
  public static fromPrimitives(plainData: {
    id: string
    path: string
  }): BackofficeMultimediaVideo {
    return new BackofficeMultimediaVideo(
      new BackofficeMultimediaVideoId(plainData.id),
      new BackofficeMultimediaVideoPath(plainData.path)
    )
  }

  /**
   * Convert the movie to primitives.
   *
   * @returns The plain object containing the movie information.
   */
  public toPrimitives(): {
    id: string
    path: string
  } {
    return {
      id: this.id.value,
      path: this.path.value
    }
  }
}
