import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class MovieRepositoryMock implements MovieRepository {
  private readonly saveMock: jest.Mock
  private readonly searchAllMock: jest.Mock
  private readonly searchByCriteriaMock: jest.Mock
  private readonly movies: Movie[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchAllMock = jest.fn()
    this.searchByCriteriaMock = jest.fn()
  }

  public async save(movie: Movie): Promise<void> {
    this.saveMock(movie)
  }

  public async searchAll(): Promise<Movie[]> {
    this.searchAllMock()
    return this.movies
  }

  public async matching(criteria: Criteria): Promise<Movie[]> {
    this.searchByCriteriaMock(criteria)
    return this.movies
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.searchByCriteriaMock).toHaveBeenCalled()
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

  public searchByCriteriaMockReturnValue(movies: Movie[]): void {
    this.movies.push(...movies)
  }
}
