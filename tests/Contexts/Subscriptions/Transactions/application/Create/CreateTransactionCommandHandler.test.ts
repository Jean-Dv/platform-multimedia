import { TransactionCreator } from '@Subscriptions/Transactions/application/Create/TransactionCreator'
import { TransactionRepositoryMock } from '../../__mocks__/TransactionRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateTransactionCommandHandler } from '@Subscriptions/Transactions/application/Create/CreateTransactionCommandHandler'
import { CreateTransactionCommandMother } from './CreateTransactionCommandMother'
import { TransactionMother } from '../../domain/TransactionMother'
import { TransactionCreatedDomainEventMother } from '../../domain/TransactionCreatedDomainEventMother'

let repository: TransactionRepositoryMock
let creator: TransactionCreator
let eventBus: EventBusMock
let handler: CreateTransactionCommandHandler

beforeEach(() => {
  repository = new TransactionRepositoryMock()
  eventBus = new EventBusMock()
  creator = new TransactionCreator(repository, eventBus)
  handler = new CreateTransactionCommandHandler(creator)
})

describe('CreateTransactionCommandHandler', () => {
  it('should create a valid transaction', async () => {
    const command = CreateTransactionCommandMother.random()
    const transaction = TransactionMother.from(command)
    const domainEvent = TransactionCreatedDomainEventMother.from(transaction)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(transaction)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })
})
