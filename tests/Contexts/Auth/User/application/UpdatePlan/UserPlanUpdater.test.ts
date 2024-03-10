import { UserPlanUpdater } from '@Auth/User/application/UpdatePlan/UserPlanUpdater'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserStartPlanMother } from '../../domain/UserStartPlanMother'
import { UserEndPlanMother } from '../../domain/UserEndPlanMother'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'
import { UserIdMother } from '../../../Shared/User/domain/UserIdMother'
import { UserStartPlanAfterEndPlan } from '@Auth/User/domain/UserStartPlanAfterEndPlan'

describe('UserPlanUpdater', () => {
  it('updates the user plan', async () => {
    const user = UserMother.random()

    const repository = new UserRepositoryMock()
    repository.searchMockReturnValue(user)
    const updater = new UserPlanUpdater(repository)

    const startPlan = UserStartPlanMother.random()
    const endPlan = UserEndPlanMother.random()
    await updater.run(user.id.value, startPlan.value, endPlan.value)

    repository.assertSaveHaveBeenCalled()
  })

  it('throws an error when the user does not exist', async () => {
    try {
      const repository = new UserRepositoryMock()
      const updater = new UserPlanUpdater(repository)

      const startPlan = UserStartPlanMother.random()
      const endPlan = UserEndPlanMother.random()

      await updater.run(
        UserIdMother.random().value,
        startPlan.value,
        endPlan.value
      )
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFound)
    }
  })

  it('throws an error when the start plan date is after the end plan date', async () => {
    try {
      const user = UserMother.random()

      const repository = new UserRepositoryMock()
      repository.searchMockReturnValue(user)
      const updater = new UserPlanUpdater(repository)

      const startPlan = UserStartPlanMother.create(new Date('2022-01-01'))
      const endPlan = UserEndPlanMother.create(new Date('2021-01-01'))

      await updater.run(user.id.value, startPlan.value, endPlan.value)
    } catch (error) {
      expect(error).toBeInstanceOf(UserStartPlanAfterEndPlan)
    }
  })
})
