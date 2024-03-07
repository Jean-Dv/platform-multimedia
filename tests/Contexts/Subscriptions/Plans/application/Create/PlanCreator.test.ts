import { PlanCreator } from '@Subscriptions/Plans/application/Create/PlanCreator'
import { PlanRepositoryMock } from '../../__mocks__/PlanRepositoryMock'
import { PlanMother } from '../../domain/PlanMother'

describe('PlanCreator', () => {
  it('creates a new plan', async () => {
    const plan = PlanMother.random()

    const repository = new PlanRepositoryMock()
    const creator = new PlanCreator(repository)

    await creator.run(
      plan.id.value,
      plan.name.value,
      plan.price.value,
      plan.duration.value,
      plan.description.value
    )
    repository.assertSaveHaveBeenCalledWith(plan)
  })
})
