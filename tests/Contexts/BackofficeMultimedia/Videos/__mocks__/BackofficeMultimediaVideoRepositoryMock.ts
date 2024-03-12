import { type BackofficeMultimediaVideo } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { type BackofficeMultimediaVideoRepository } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoRepository'

export class BackofficeMultimediaVideoRepositoryMock
  implements BackofficeMultimediaVideoRepository
{
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(video: BackofficeMultimediaVideo): Promise<void> {
    this.mockSave(video)
  }

  /**
   * Asserts that the `save` method has been called with the specified video.
   *
   * @param video - The expected video
   */
  public assertSaveHaveBeenCalledWith(video: BackofficeMultimediaVideo): void {
    expect(this.mockSave).toHaveBeenCalledWith(video)
  }
}
