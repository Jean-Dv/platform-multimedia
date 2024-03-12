import { MovieCreator } from '@Multimedia/Movies/application/Create/MovieCreator'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'

describe('MovieCreator', () => {
  it('creates a new movie', async () => {
    const movie = MovieMother.random()

    const repository = new MovieRepositoryMock()
    const creator = new MovieCreator(repository)

    await creator.run(
      movie.id.value,
      movie.title.value,
      movie.releaseYear.value,
      movie.synopsis.value,
      movie.categories.map((category) => category.value),
      movie.videoId.value
    )
    repository.assertSaveHaveBeenCalledWith(movie)
  })
})
