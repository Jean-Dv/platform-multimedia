import { MovieDeletor } from '@Multimedia/Movies/application/Delete/MovieDeletor'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'

describe('MovieDeletor', () => {
  it('deletes a movie', async () => {
    const movie = MovieMother.random()

    const repository = new MovieRepositoryMock()
    const creator = new MovieDeletor(repository)

    await creator.run(movie.id.value)

    // Then the movie repository should have been called with the movie id
    repository.assertDeleteHaveBeenCalledWith(movie.id)
  })
})
