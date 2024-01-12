import { type BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { type BackofficeMultimediaMovieRepository } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieRepository'

/**
 * Mock implementation of the `BackofficeMultimediaMovieRepository` for testing.
 */
export class BackofficeMultimediaMovieRepositoryMock
  implements BackofficeMultimediaMovieRepository
{
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(movie: BackofficeMultimediaMovie): Promise<void> {
    this.mockSave(movie)
  }

  /**
   * Asserts that the `save` method has been called with the specified movie.
   *
   * @param movie - The expected movie
   */
  public assertSaveHaveBeenCalledWith(movie: BackofficeMultimediaMovie): void {
    expect(this.mockSave).toHaveBeenCalledWith(movie)
  }
}
