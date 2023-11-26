import { type Movie } from '@Multimedia/Movies/domain/Movie'

export class MovieRepositoryMock {
  private readonly saveMock: jest.Mock
  private readonly movies: Movie[] = []

  constructor() {
    this.saveMock = jest.fn()
  }

  public async save(movie: Movie): Promise<void> {
    this.saveMock(movie)
  }

  public assertSaveHaveBeenCalledWith(movie: Movie): void {
    expect(this.saveMock).toHaveBeenCalledWith(movie)
  }

  public searchMockReturnValue(movie: Movie): void {
    this.movies.push(movie)
  }
}
