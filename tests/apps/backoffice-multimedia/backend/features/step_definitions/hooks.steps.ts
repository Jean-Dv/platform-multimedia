import { type EventBus } from '@Shared/domain/EventBus'
import {
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout
} from '@cucumber/cucumber'
import 'module-alias/register'
import { BackofficeMultimediaBackendApp } from '../../../../../../src/apps/backoffice-multimedia/backend/BackofficeMultimediaBackendApp'
import { container } from '../../../../../../src/apps/backoffice-multimedia/backend/dependency-injection'
import { type EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/persistence/EnvironmentArranger'

let application: BackofficeMultimediaBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

setDefaultTimeout(300 * 1000)

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'BackofficeMultimedia.EnvironmentArranger'
  )
  eventBus = container.get<EventBus>(
    'BackofficeMultimedia.Shared.domain.EventBus'
  )
  await environmentArranger.arrange()
  application = new BackofficeMultimediaBackendApp()
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
