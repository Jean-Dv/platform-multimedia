import 'module-alias/register'
import { type EventBus } from '@Shared/domain/EventBus'
import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/multimedia/backend/dependency-injection'
import { MultimediaBackendApp } from '../../../../../../src/apps/multimedia/backend/MultimediaBackendApp'
import { type EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/persistence/EnvironmentArranger'

let application: MultimediaBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

setDefaultTimeout(300 * 1000)

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>(
    'Multimedia.EnvironmentArranger'
  )
  eventBus = container.get<EventBus>('Multimedia.Shared.domain.EventBus')
  await environmentArranger.arrange()
  application = new MultimediaBackendApp()
  await application.start()
})

AfterAll(async () => {
  await environmentArranger.close()
  await application.stop()
})

export { application, environmentArranger, eventBus }
