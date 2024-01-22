import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'

/**
 * Mock implementation of the `BackofficeMultimediaSeasonRepository` for testing.
 */
export class BackofficeMultimediaSeasonRepositoryMock
  implements BackofficeMultimediaSeasonRepository
{
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(season: BackofficeMultimediaSeason): Promise<void> {
    this.mockSave(season)
  }

  /**
   * Asserts that the `save` method has been called with the specified season.
   *
   * @param season - The expected season
   */
  public assertSaveHaveBeenCalledWith(
    season: BackofficeMultimediaSeason
  ): void {
    expect(this.mockSave).toHaveBeenCalledWith(season)
  }
}
