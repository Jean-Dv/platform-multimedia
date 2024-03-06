import 'module-alias/register'
import { type EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/persistence/EnvironmentArranger'
import { SubscriptionBackendApp } from '../../../../../../src/apps/subscriptions/backend/SubscriptionBackendApp'
import { type EventBus } from '@Shared/domain/EventBus'
import {
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout
} from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/subscriptions/backend/dependency-injection'

let application: SubscriptionBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

setDefaultTimeout(300 * 1000)

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'Subscriptions.EnvironmentArranger'
  )
  eventBus = container.get<EventBus>('Subscriptions.Shared.domain.EventBus')
  await environmentArranger.arrange()
  application = new SubscriptionBackendApp()
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
