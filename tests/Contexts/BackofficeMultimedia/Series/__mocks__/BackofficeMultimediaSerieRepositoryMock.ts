import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

export class BackofficeMultimediaSerieRepositoryMock
  implements BackofficeMultimediaSerieRepository
{
  private readonly mockSave: jest.Mock
  private readonly mockSearch: jest.Mock
  private readonly mockDelete: jest.Mock
  private readonly series: BackofficeMultimediaSerie[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
    this.mockDelete = jest.fn()
  }

  public async save(serie: BackofficeMultimediaSerie): Promise<void> {
    this.mockSave(serie)
  }

  public async search(
    id: BackofficeMultimediaSerieId
  ): Promise<BackofficeMultimediaSerie | null> {
    this.mockSearch(id)
    return this.series.find((serie) => serie.id.value === id.value) ?? null
  }

  public async delete(serie: BackofficeMultimediaSerie): Promise<void> {
    this.mockDelete(serie)
  }

  /**
   * Asserts that the `save` method has been called with the specified serie.
   *
   * @param serie - The expected serie
   */
  public assertSaveHaveBeenCalledWith(serie: BackofficeMultimediaSerie): void {
    expect(this.mockSave).toHaveBeenCalledWith(serie)
  }

  /**
   * Asserts that the `search` method has been called with the specified id.
   *
   * @param id - The expected id.
   */
  public assertSearchHaveBeenCalledWith(id: BackofficeMultimediaSerieId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  /**
   * Asserts that the `delete` method has been called with the specified serie.
   *
   * @param serie - The expected serie.
   */
  public assertDeleteHaveBeenCalledWith(
    serie: BackofficeMultimediaSerie
  ): void {
    expect(this.mockDelete).toHaveBeenCalledWith(serie)
  }

  /**
   * Sets the return value of the `search` method.
   *
   * @param series - The series to return.
   */
  public searchMockReturnValue(series: BackofficeMultimediaSerie[]): void {
    this.series.push(...series)
  }
}
