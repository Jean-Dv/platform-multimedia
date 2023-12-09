import { UserCreator } from '@Auth/User/application/Create/UserCreator'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { CreateUserCommandMother } from './CreateUserCommandMother'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateUserCommandHandler } from '@Auth/User/application/Create/CreateUserCommandHandler'
import { UserMother } from '../../domain/UserMother'
import { UserCreatedDomainEventMother } from '../../domain/UserCreatedDomainEvent'

let repository: UserRepositoryMock
let creator: UserCreator
let eventBus: EventBusMock
let handler: CreateUserCommandHandler

beforeEach(() => {
  repository = new UserRepositoryMock()
  eventBus = new EventBusMock()
  creator = new UserCreator(repository, eventBus)
  handler = new CreateUserCommandHandler(creator)
})

describe('CreateUserCommandHandler', () => {
  it('should create a valid user', async () => {
    const command = CreateUserCommandMother.random()
    const user = UserMother.from(command)
    const domainEvent = UserCreatedDomainEventMother.fromUser(user)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(user)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })
})
