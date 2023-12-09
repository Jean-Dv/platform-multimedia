import { SearchSeasonByIdQueryHandler } from '@Multimedia/Season/application/SearchById/SearchSeasonByIdQueryHandler'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import { SeasonMother } from '../../domain/SeasonMother'
import { SeasonByIdSearcher } from '@Multimedia/Season/application/SearchById/SeasonByIdSearcher'
import { SearchSeasonByIdQuery } from '@Multimedia/Season/application/SearchById/SearchSeasonByIdQuery'
import { SearchSeasonByIdResponseMother } from './SearchSeasonByIdResponseMother'
import { SeasonNotFound } from '@Multimedia/Season/domain/SeasonNotFound'
import { SeasonIdMother } from '../../../Shared/domain/SeasonIdMother'

describe('SearchSeasonByIdQueryHandler', () => {
  let repository: SeasonRepositoryMock

  beforeEach(() => {
    repository = new SeasonRepositoryMock()
  })

  it('should find season by id', async () => {
    const seasons = [
      SeasonMother.random(),
      SeasonMother.random(),
      SeasonMother.random()
    ]
    repository.searchByIdMockReturnValue(seasons[1])

    const handler = new SearchSeasonByIdQueryHandler(
      new SeasonByIdSearcher(repository)
    )
    const query = new SearchSeasonByIdQuery(seasons[1].id.value)
    const response = await handler.handle(query)
    const expected = SearchSeasonByIdResponseMother.create(seasons[1])
    repository.assertSearchByIdHaveBeenCalledWith(seasons[1].id)
    expect(expected).toEqual(response)
  })

  it('should not find season by id', async () => {
    try {
      const seasons = [
        SeasonMother.random(),
        SeasonMother.random(),
        SeasonMother.random()
      ]
      repository.searchByIdMockReturnValue(seasons[1])

      const handler = new SearchSeasonByIdQueryHandler(
        new SeasonByIdSearcher(repository)
      )
      const idForTest = SeasonIdMother.random()
      const query = new SearchSeasonByIdQuery(idForTest.value)
      const response = await handler.handle(query)
      const expected = SearchSeasonByIdResponseMother.create(seasons[1])
      repository.assertSearchByIdHaveBeenCalledWith(idForTest)
      expect(expected).toEqual(response)
    } catch (error) {
      expect(error).toBeInstanceOf(SeasonNotFound)
    }
  })
})
