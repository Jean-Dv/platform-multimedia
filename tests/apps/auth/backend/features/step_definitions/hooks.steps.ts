import 'module-alias/register'
import { AfterAll, Before, BeforeAll } from '@cucumber/cucumber'
import { type EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/persistence/EnvironmentArranger'
import { AuthBackendApp } from '../../../../../../src/apps/auth/backend/AuthBackendApp'
import { container } from '../../../../../../src/apps/auth/backend/dependency-injection'
import { type EventBus } from '@Shared/domain/EventBus'

let application: AuthBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'Auth.EnvironmentArranger'
  )
  eventBus = container.get<EventBus>('Auth.Shared.domain.EventBus')
  await environmentArranger.arrange()
  application = new AuthBackendApp()
  await application.start()
})

Before(async () => {
  await environmentArranger.arrange()
})

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()
  await application.stop()
})

export { application, environmentArranger, eventBus }
