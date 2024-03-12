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
  private readonly mockSearch: jest.Mock
  private readonly mockDelete: jest.Mock
  private readonly seasons: BackofficeMultimediaSeason[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
    this.mockDelete = jest.fn()
  }

  public async save(season: BackofficeMultimediaSeason): Promise<void> {
    this.mockSave(season)
  }

  public async search(
    id: BackofficeMultimediaSeasonId
  ): Promise<BackofficeMultimediaSeason | null> {
    this.mockSearch(id)
    return this.seasons.find((season) => season.id.value === id.value) ?? null
  }

  public async delete(season: BackofficeMultimediaSeason): Promise<void> {
    this.mockDelete(season)
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
   * Asserts that the `search` method has been called with the specified ID.
   *
   * @param id - The expected ID.
   */
  public assertSearchHaveBeenCalledWith(
    id: BackofficeMultimediaSeasonId
  ): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  /**
   * Asserts that the `delete` method has been called with the specified season.
   *
   * @param season - The expected season.
   */
  public assertDeleteHaveBeenCalledWith(
    season: BackofficeMultimediaSeason
  ): void {
    expect(this.mockDelete).toHaveBeenCalledWith(season)
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
