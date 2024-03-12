import { type BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { type BackofficeMultimediaMovieRepository } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieRepository'

/**
 * Mock implementation of the `BackofficeMultimediaMovieRepository` for testing.
 */
export class BackofficeMultimediaMovieRepositoryMock
  implements BackofficeMultimediaMovieRepository
{
  private readonly mockSave: jest.Mock
  private readonly mockSearch: jest.Mock
  private readonly mockDelete: jest.Mock
  private readonly movies: BackofficeMultimediaMovie[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
    this.mockDelete = jest.fn()
  }

  public async save(movie: BackofficeMultimediaMovie): Promise<void> {
    this.mockSave(movie)
  }

  public async search(
    id: BackofficeMultimediaMovieId
  ): Promise<BackofficeMultimediaMovie | null> {
    this.mockSearch(id)
    return this.movies.find((chapter) => chapter.id.value === id.value) ?? null
  }

  public async delete(movie: BackofficeMultimediaMovie): Promise<void> {
    this.mockDelete(movie)
  }

  /**
   * Asserts that the `save` method has been called with the specified movie.
   *
   * @param movie - The expected movie
   */
  public assertSaveHaveBeenCalledWith(movie: BackofficeMultimediaMovie): void {
    expect(this.mockSave).toHaveBeenCalledWith(movie)
  }

  /**
   * Asserts that the `search` method has been called with the specified id.
   *
   * @param id - The expected id
   */
  public assertSearchHaveBeenCalledWith(id: BackofficeMultimediaMovieId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  /**
   * Asserts that the `delete` method has been called with the specified movie.
   *
   * @param movie - The expected movie
   */
  public assertDeleteHaveBeenCalledWith(
    movie: BackofficeMultimediaMovie
  ): void {
    expect(this.mockDelete).toHaveBeenCalledWith(movie)
  }

  /**
   * Sets the movies to be returned by the `search` method.
   *
   * @param movies - The movies to set
   */
  public setMovies(movies: BackofficeMultimediaMovie[]): void {
    this.movies.push(...movies)
  }
}
