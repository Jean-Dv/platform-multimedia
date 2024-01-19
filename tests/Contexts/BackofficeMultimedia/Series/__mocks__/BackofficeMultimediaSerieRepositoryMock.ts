import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'

export class BackofficeMultimediaSerieRepositoryMock
  implements BackofficeMultimediaSerieRepository
{
  private readonly mockSave: jest.Mock
  private readonly series: BackofficeMultimediaSerie[] = []

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(serie: BackofficeMultimediaSerie): Promise<void> {
    this.mockSave(serie)
  }

  public async search(
    id: BackofficeMultimediaSerieId
  ): Promise<BackofficeMultimediaSerie | null> {
    return this.series.find((serie) => serie.id.value === id.value) ?? null
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
   * Sets the return value of the `search` method.
   *
   * @param series - The series to return.
   */
  public searchMockReturnValue(series: BackofficeMultimediaSerie[]): void {
    this.series.push(...series)
  }
}
