import { Plan } from '../../domain/Plan'
import { type PlanRepository } from '../../domain/PlanRepository'

/**
 * Service responsible for creating a plan.
 */
export class PlanCreator {
  constructor(private readonly repository: PlanRepository) {}

  /**
   * Runs the service.
   *
   * @param id - The plan id.
   * @param name - The plan name.
   * @param price - The plan price.
   * @param duration - The plan duration.
   * @param description - The plan description.
   */
  public async run(
    id: string,
    name: string,
    price: number,
    duration: number,
    description: string
  ): Promise<void> {
    const plan = Plan.fromPrimitives({
      id,
      name,
      price,
      duration,
      description
    })
    await this.repository.save(plan)
  }
}
