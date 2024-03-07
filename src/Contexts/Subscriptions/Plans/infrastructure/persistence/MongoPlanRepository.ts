import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { Plan } from '../../domain/Plan'
import { type PlanRepository } from '../../domain/PlanRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

interface PlanDocument {
  _id: string
  name: string
  price: number
  duration: number
  description: string
}

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

  public async matching(criteria: Criteria): Promise<Plan[]> {
    const documents = await this.searchByCriteria<PlanDocument>(criteria)
    return documents.map((document) =>
      Plan.fromPrimitives({
        id: document._id,
        name: document.name,
        price: document.price,
        duration: document.duration,
        description: document.description
      })
    )
  }

  protected collectionName(): string {
    return 'plans'
  }
}
