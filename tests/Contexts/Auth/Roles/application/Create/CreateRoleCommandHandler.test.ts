import { RoleCreator } from '@Auth/Roles/application/Create/RoleCreator'
import { RoleRepositoryMock } from '../../__mocks__/RoleRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateRoleCommandHandler } from '@Auth/Roles/application/Create/CreateRoleCommandHandler'
import { RoleMother } from '../../domain/RoleMother'
import { RoleCreatedDomainEventMother } from '../../domain/RoleCreatedDomainEventMother'
import { CreateRoleCommandMother } from './CreateRoleCommandMother'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

let repository: RoleRepositoryMock
let creator: RoleCreator
let eventBus: EventBusMock
let handler: CreateRoleCommandHandler

beforeEach(() => {
  repository = new RoleRepositoryMock()
  eventBus = new EventBusMock()
  creator = new RoleCreator(repository, eventBus)
  handler = new CreateRoleCommandHandler(creator)
})

describe('CreateRoleCommandHandler', () => {
  it('should create a valid role', async () => {
    const command = CreateRoleCommandMother.random()
    const role = RoleMother.from(command)
    const domainEvent = RoleCreatedDomainEventMother.fromRole(role)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(role)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateRoleCommandMother.invalid()
      const role = RoleMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(role)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidArgumentError)
    }
  })
})
