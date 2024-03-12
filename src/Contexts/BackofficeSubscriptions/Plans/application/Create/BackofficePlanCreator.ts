import { type EventBus } from '@Shared/domain/EventBus'
import { type BackofficePlanRepository } from '../../domain/BackofficePlanRepository'
import { type BackofficePlanId } from '../../domain/BackofficePlanId'
import { type BackofficePlanName } from '../../domain/BackofficePlanName'
import { type BackofficePlanPrice } from '../../domain/BackofficePlanPrice'
import { type BackofficePlanDaysDuration } from '../../domain/BackofficePlanDaysDuration'
import { type BackofficePlanDescription } from '../../domain/BackofficePlanDescription'
import { BackofficePlan } from '../../domain/BackofficePlan'

/**
 * Service for creating plans.
 */
export class BackofficePlanCreator {
  constructor(
    private readonly repository: BackofficePlanRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the plan creation process.
   *
   * @param params - Parameters for creating the plan.
   */
  public async run(params: {
    id: BackofficePlanId
    name: BackofficePlanName
    price: BackofficePlanPrice
    duration: BackofficePlanDaysDuration
    description: BackofficePlanDescription
  }): Promise<void> {
    const plan = BackofficePlan.create(
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
