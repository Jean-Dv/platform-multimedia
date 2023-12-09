import { SearchSerieByIdQueryHandler } from '@Multimedia/Serie/application/SearchById/SearchSerieByIdQueryHandler'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import { SerieMother } from '../../domain/SerieMother'
import { SerieByIdSearcher } from '@Multimedia/Serie/application/SearchById/SerieByIdSearcher'
import { SearchSerieByIdQuery } from '@Multimedia/Serie/application/SearchById/SearchSerieByIdQuery'
import { SearchSerieByIdResponseMother } from './SearchSerieByIdResponseMother'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'
import { SerieIdMother } from '../../../Shared/domain/SerieIdMother'

describe('SearchSerieByIdQueryHandler', () => {
  let repository: SerieRepositoryMock

  beforeEach(() => {
    repository = new SerieRepositoryMock()
  })

  it('should find serie by id', async () => {
    const series = [
      SerieMother.random(),
      SerieMother.random(),
      SerieMother.random()
    ]
    repository.searchByIdMockReturnValue(series[1])

    const handler = new SearchSerieByIdQueryHandler(
      new SerieByIdSearcher(repository)
    )
    const query = new SearchSerieByIdQuery(series[1].id.value)
    const response = await handler.handle(query)
    const expected = SearchSerieByIdResponseMother.create(series[1])
    repository.assertSearchByIdHaveBeenCalledWith(series[1].id)
    expect(expected).toEqual(response)
  })

  it('should not find serie by id', async () => {
    try {
      const series = [
        SerieMother.random(),
        SerieMother.random(),
        SerieMother.random()
      ]
      repository.searchByIdMockReturnValue(series[1])

      const handler = new SearchSerieByIdQueryHandler(
        new SerieByIdSearcher(repository)
      )
      const idForTest = SerieIdMother.random()
      const query = new SearchSerieByIdQuery(idForTest.value)
      const response = await handler.handle(query)
      const expected = SearchSerieByIdResponseMother.create(series[1])
      repository.assertSearchByIdHaveBeenCalledWith(idForTest)
      expect(expected).toEqual(response)
    } catch (error) {
      expect(error).toBeInstanceOf(SerieNotFound)
    }
  })
})
