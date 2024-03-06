import 'module-alias/register'
import { type EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/persistence/EnvironmentArranger'
import { BackofficeSubscriptionBackendApp } from '../../../../../../src/apps/backoffice-subscriptions/backend/BackofficeSubscriptionBackendApp'
import { type EventBus } from '@Shared/domain/EventBus'
import {
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/backoffice-subscriptions/backend/dependency-injection'

let application: BackofficeSubscriptionBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

setDefaultTimeout(300 * 1000)

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'BackofficeSubscriptions.EnvironmentArranger'
  )
  eventBus = container.get<EventBus>(
    'BackofficeSubscriptions.Shared.domain.EventBus'
  )
  await environmentArranger.arrange()
  application = new BackofficeSubscriptionBackendApp()
  await application.start()
})

Before(async () => {
  await environmentArranger.arrange()
})

AfterAll(async () => {
  await environmentArranger.close()
  await application.stop()
})

export { application, environmentArranger, eventBus }
