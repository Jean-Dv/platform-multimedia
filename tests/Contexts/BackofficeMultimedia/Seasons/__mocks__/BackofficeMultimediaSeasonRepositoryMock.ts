import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { type BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'

/**
 * Mock implementation of the `BackofficeMultimediaSeasonRepository` for testing.
 */
export class BackofficeMultimediaSeasonRepositoryMock
  implements BackofficeMultimediaSeasonRepository
{
  private readonly mockSave: jest.Mock
  private readonly seasons: BackofficeMultimediaSeason[] = []

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(season: BackofficeMultimediaSeason): Promise<void> {
    this.mockSave(season)
  }

  public async search(
    id: BackofficeMultimediaSeasonId
  ): Promise<BackofficeMultimediaSeason | null> {
    return this.seasons.find((season) => season.id.value === id.value) ?? null
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

  /**
   * Sets the return value of the `search` method.
   *
   * @param seasons - The seasons to return.
   */
  public searchMockReturnValue(seasons: BackofficeMultimediaSeason[]): void {
    this.seasons.push(...seasons)
  }
}
