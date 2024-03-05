import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type Plan } from '../../domain/Plan'
import { type PlanRepository } from '../../domain/PlanRepository'

/**
 * Mongo repository for plans.
 */
export class MongoPlanRepository
  extends MongoRepository<Plan>
  implements PlanRepository
{
  public async save(plan: Plan): Promise<void> {
    await this.persist(plan.id.value, plan)
  }

  protected collectionName(): string {
    return 'plans'
  }
}
