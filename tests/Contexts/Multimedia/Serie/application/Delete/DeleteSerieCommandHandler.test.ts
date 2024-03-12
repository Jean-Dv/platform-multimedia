import { SerieDeletor } from '@Multimedia/Serie/application/Delete/SerieDeletor'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteSerieCommandHandler } from '@Multimedia/Serie/application/Delete/DeleteSerieCommandHandler'
import { SerieMother } from '../../domain/SerieMother'
import { DeleteSerieCommandMother } from './DeleteSerieCommandMother'
import { SerieDeletedDomainEventMother } from '../../domain/SerieDeletedDomainEventMother'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'

let repository: SerieRepositoryMock
let deletor: SerieDeletor
let eventBus: EventBusMock
let handler: DeleteSerieCommandHandler

beforeEach(() => {
  repository = new SerieRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new SerieDeletor(repository, eventBus)
  handler = new DeleteSerieCommandHandler(deletor)
})

describe('DeleteSerieCommandHandler', () => {
  it('should delete a valid serie', async () => {
    const series = [
      SerieMother.random(),
      SerieMother.random(),
      SerieMother.random()
    ]
    repository.searchByIdMockReturnValue(series[0])

    const command = DeleteSerieCommandMother.create(series[0].id)
    const domainEvent = SerieDeletedDomainEventMother.fromSerie(series[0])

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(series[0].id)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when serie does not exist', async () => {
    try {
      const command = DeleteSerieCommandMother.random()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(SerieNotFound)
    }
  })
})
