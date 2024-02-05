import { MovieUpdaterCategory } from '@Multimedia/Movies/application/UpdateCategory/MovieUpdaterCategory'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'

describe('MovieUpdaterCategory', () => {
  it('updates movies by category', async () => {
    const movie = MovieMother.random()
    const repository = new MovieRepositoryMock()
    const updater = new MovieUpdaterCategory(repository)

    const name = movie.categories[0]
    await updater.run(name.value)
    repository.assertUpdateMoviesByCategoryHaveBeenCalledWith(name)
  })
})
