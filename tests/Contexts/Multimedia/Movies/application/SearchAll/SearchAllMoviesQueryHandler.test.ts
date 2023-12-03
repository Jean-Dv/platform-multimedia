import { SearchAllMoviesQueryHandler } from '@Multimedia/Movies/application/SearchAll/SearchAllMoviesQueryHandler'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'
import { MoviesFinder } from '@Multimedia/Movies/application/SearchAll/MoviesFinder'
import { SearchAllMoviesQuery } from '@Multimedia/Movies/application/SearchAll/SearchAllMoviesQuery'
import { SearchAllMoviesResponseMother } from './SearchAllMoviesResponseMother'

describe('SearchAllMoviesQueryHandler', () => {
  let repository: MovieRepositoryMock

  beforeEach(() => {
    repository = new MovieRepositoryMock()
  })

  it('should return an array of movies', async () => {
    const movies = [
      MovieMother.random(),
      MovieMother.random(),
      MovieMother.random()
    ]
    repository.searchAllMockReturnValue(movies)

    const handler = new SearchAllMoviesQueryHandler(
      new MoviesFinder(repository)
    )
    const query = new SearchAllMoviesQuery()
    const response = await handler.handle(query)

    repository.assertSearchAll()

    const expectedResponse = SearchAllMoviesResponseMother.create(movies)
    expect(expectedResponse).toEqual(response)
  })
})
