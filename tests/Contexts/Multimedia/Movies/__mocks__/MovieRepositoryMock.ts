import { type Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class MovieRepositoryMock implements MovieRepository {
  private readonly saveMock: jest.Mock
  private readonly searchAllMock: jest.Mock
  private readonly searchByCriteriaMock: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly updateMoviesByCategoryMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly movies: Movie[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchAllMock = jest.fn()
    this.searchByCriteriaMock = jest.fn()
    this.searchMock = jest.fn()
    this.updateMoviesByCategoryMock = jest.fn()
    this.deleteMock = jest.fn()
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

  public async search(id: MovieId): Promise<Movie | null> {
    this.searchMock(id)
    return this.movies.find((movie) => movie.id.value === id.value) ?? null
  }

  public async updateMoviesByCategory(name: CategoryName): Promise<void> {
    this.updateMoviesByCategoryMock(name)
  }

  public async delete(id: MovieId): Promise<void> {
    this.deleteMock(id)
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

  public assertSearchHaveBeenCalledWith(id: MovieId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id)
  }

  public assertUpdateMoviesByCategoryHaveBeenCalledWith(
    name: CategoryName
  ): void {
    expect(this.updateMoviesByCategoryMock).toHaveBeenCalledWith(name)
  }

  public assertDeleteHaveBeenCalledWith(id: MovieId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id)
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
