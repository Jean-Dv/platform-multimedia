import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type BackofficePlan } from '../../domain/BackofficePlan'
import { type BackofficePlanRepository } from '../../domain/BackofficePlanRepository'

/**
 * Mongo repository for plans.
 */
export class MongoBackofficePlanRepository
  extends MongoRepository<BackofficePlan>
  implements BackofficePlanRepository
{
  public async save(plan: BackofficePlan): Promise<void> {
    await this.persist(plan.id.value, plan)
  }

  protected collectionName(): string {
    return 'plans'
  }
}
