import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'

export class BackofficeMultimediaSerieRepositoryMock
  implements BackofficeMultimediaSerieRepository
{
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(serie: BackofficeMultimediaSerie): Promise<void> {
    this.mockSave(serie)
  }

  /**
   * Asserts that the `save` method has been called with the specified serie.
   *
   * @param serie - The expected serie
   */
  public assertSaveHaveBeenCalledWith(serie: BackofficeMultimediaSerie): void {
    expect(this.mockSave).toHaveBeenCalledWith(serie)
  }
}
