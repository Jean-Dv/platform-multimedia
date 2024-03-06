import { BackofficePlanCreator } from '@BackofficeSubscriptions/Plans/application/Create/BackofficePlanCreator'
import { BackofficePlanRepositoryMock } from '../../__mocks__/BackofficePlanRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficePlanCommandHandler } from '@BackofficeSubscriptions/Plans/application/Create/CreateBackofficePlanCommandHandler'
import { CreateBackofficePlanCommandMother } from './CreatePlanCommandMother'
import { BackofficePlanMother } from '../../domain/BackofficePlanMother'
import { BackofficePlanCreatedDomainEventMother } from '../../domain/BackofficePlanCreatedDomainEventMother'
import { BackofficePlanNameLengthExceeded } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanNameLengthExceeded'
import { BackofficePlanPriceIsNegative } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanPriceIsNegative'
import { BackofficePlanDaysDurationIsNegative } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanDaysDurationIsNegative'

let repository: BackofficePlanRepositoryMock
let creator: BackofficePlanCreator
let eventBus: EventBusMock
let handler: CreateBackofficePlanCommandHandler

beforeEach(() => {
  repository = new BackofficePlanRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficePlanCreator(repository, eventBus)
  handler = new CreateBackofficePlanCommandHandler(creator)
})

describe('CreatePlanCommandHandler', () => {
  it('should create a valid plan', async () => {
    const command = CreateBackofficePlanCommandMother.random()
    const plan = BackofficePlanMother.from(command)
    const domainEvent = BackofficePlanCreatedDomainEventMother.fromPlan(plan)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(plan)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateBackofficePlanCommandMother.invalidName()
      const plan = BackofficePlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficePlanNameLengthExceeded)
    }
  })

  it('should throw an error when price is invalid', async () => {
    try {
      const command = CreateBackofficePlanCommandMother.invalidPrice()
      const plan = BackofficePlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficePlanPriceIsNegative)
    }
  })

  it('should throw an error when duration is invalid', async () => {
    try {
      const command = CreateBackofficePlanCommandMother.invalidDuration()
      const plan = BackofficePlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficePlanDaysDurationIsNegative)
    }
  })
})
