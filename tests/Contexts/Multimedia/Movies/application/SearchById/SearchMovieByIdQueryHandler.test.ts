import { SearchMovieByIdQueryHandler } from '@Multimedia/Movies/application/SearchById/SearchMovieByIdQueryHandler'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'
import { MovieByIdSearcher } from '@Multimedia/Movies/application/SearchById/MovieByIdSearcher'
import { SearchMovieByIdQuery } from '@Multimedia/Movies/application/SearchById/SearchMovieByIdQuery'
import { SearchMovieByIdResponseMother } from './SearchMovieByIdResponseMother'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'
import { MovieNotFound } from '@Multimedia/Movies/domain/MovieNotFound'

describe('SearchMovieByIdQueryHandler', () => {
  let repository: MovieRepositoryMock

  beforeEach(() => {
    repository = new MovieRepositoryMock()
  })

  it('should find movie by id', async () => {
    const movies = [
      MovieMother.random(),
      MovieMother.random(),
      MovieMother.random()
    ]
    repository.searchMockReturnValue(movies[1])

    const handler = new SearchMovieByIdQueryHandler(
      new MovieByIdSearcher(repository)
    )
    const query = new SearchMovieByIdQuery(movies[1].id.value)
    const response = await handler.handle(query)
    const expected = SearchMovieByIdResponseMother.create(movies[1])
    repository.assertSearchHaveBeenCalledWith(movies[1].id)
    expect(expected).toEqual(response)
  })

  it('should not find movie by id', async () => {
    try {
      const movies = [
        MovieMother.random(),
        MovieMother.random(),
        MovieMother.random()
      ]
      repository.searchMockReturnValue(movies[1])

      const handler = new SearchMovieByIdQueryHandler(
        new MovieByIdSearcher(repository)
      )
      const idForTest = MovieId.random()
      const query = new SearchMovieByIdQuery(idForTest.value)
      const response = await handler.handle(query)
      const expected = SearchMovieByIdResponseMother.create(movies[1])
      repository.assertSearchHaveBeenCalledWith(idForTest)
      expect(expected).toEqual(response)
    } catch (error) {
      expect(error).toBeInstanceOf(MovieNotFound)
    }
  })
})
