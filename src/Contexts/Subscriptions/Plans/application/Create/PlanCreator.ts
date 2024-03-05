import { type EventBus } from '@Shared/domain/EventBus'
import { type PlanRepository } from '../../domain/PlanRepository'
import { type PlanId } from '../../domain/PlanId'
import { type PlanName } from '../../domain/PlanName'
import { type PlanPrice } from '../../domain/PlanPrice'
import { type PlanDaysDuration } from '../../domain/PlanDaysDuration'
import { type PlanDescription } from '../../domain/PlanDescription'
import { Plan } from '../../domain/Plan'

/**
 * Service for creating plans.
 */
export class PlanCreator {
  constructor(
    private readonly repository: PlanRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the plan creation process.
   *
   * @param params - Parameters for creating the plan.
   */
  public async run(params: {
    id: PlanId
    name: PlanName
    price: PlanPrice
    duration: PlanDaysDuration
    description: PlanDescription
  }): Promise<void> {
    const plan = Plan.create(
      params.id,
      params.name,
      params.price,
      params.duration,
      params.description
    )

    await this.repository.save(plan)
    await this.eventBus.publish(plan.pullDomainEvents())
  }
}
