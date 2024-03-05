import { PlanCreator } from '@Subscriptions/Plans/application/Create/PlanCreator'
import { PlanRepositoryMock } from '../../__mocks__/PlanRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreatePlanCommandHandler } from '@Subscriptions/Plans/application/Create/CreatePlanCommandHandler'
import { CreatePlanCommandMother } from './CreatePlanCommandMother'
import { PlanMother } from '../../domain/PlanMother'
import { PlanCreatedDomainEventMother } from '../../domain/PlanCreatedDomainEventMother'
import { PlanNameLengthExceeded } from '@Subscriptions/Plans/domain/PlanNameLengthExceeded'
import { PlanPriceIsNegative } from '@Subscriptions/Plans/domain/PlanPriceIsNegative'
import { PlanDaysDurationIsNegative } from '@Subscriptions/Plans/domain/PlanDaysDurationIsNegative'

let repository: PlanRepositoryMock
let creator: PlanCreator
let eventBus: EventBusMock
let handler: CreatePlanCommandHandler

beforeEach(() => {
  repository = new PlanRepositoryMock()
  eventBus = new EventBusMock()
  creator = new PlanCreator(repository, eventBus)
  handler = new CreatePlanCommandHandler(creator)
})

describe('CreatePlanCommandHandler', () => {
  it('should create a valid plan', async () => {
    const command = CreatePlanCommandMother.random()
    const plan = PlanMother.from(command)
    const domainEvent = PlanCreatedDomainEventMother.fromPlan(plan)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(plan)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreatePlanCommandMother.invalidName()
      const plan = PlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(PlanNameLengthExceeded)
    }
  })

  it('should throw an error when price is invalid', async () => {
    try {
      const command = CreatePlanCommandMother.invalidPrice()
      const plan = PlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(PlanPriceIsNegative)
    }
  })

  it('should throw an error when duration is invalid', async () => {
    try {
      const command = CreatePlanCommandMother.invalidDuration()
      const plan = PlanMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(plan)
    } catch (error) {
      expect(error).toBeInstanceOf(PlanDaysDurationIsNegative)
    }
  })
})
