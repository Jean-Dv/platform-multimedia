import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'

export class MovieRepositoryMock implements MovieRepository {
  private readonly saveMock: jest.Mock
  private readonly searchAllMock: jest.Mock
  private readonly movies: Movie[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchAllMock = jest.fn()
  }

  public async save(movie: Movie): Promise<void> {
    this.saveMock(movie)
  }

  public async searchAll(): Promise<Movie[]> {
    this.searchAllMock()
    return this.movies
  }

  public assertSearchAll(): void {
    expect(this.searchAllMock).toHaveBeenCalled()
  }

  public assertSaveHaveBeenCalledWith(movie: Movie): void {
    expect(this.saveMock).toHaveBeenCalledWith(movie)
  }

  public searchMockReturnValue(movie: Movie): void {
    this.movies.push(movie)
  }

  public searchAllMockReturnValue(movies: Movie[]): void {
    this.movies.push(...movies)
  }
}
