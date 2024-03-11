import { DomainEventDeserializer } from '@Shared/infrastructure/EventBus/DomainEventDeserializer'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'
import { container } from '../../../../../../src/apps/auth/backend/dependency-injection'
import { Given } from '@cucumber/cucumber'
import { eventBus } from './hooks.steps'

const deserializer = buildDeserializer()

Given('the following event is received:', async (event: string) => {
  const eventData = JSON.parse(event)
  if (eventData.data.occurredOn === 'now()') {
    eventData.data.occurredOn = new Date()
  }
  const eventSerialized = JSON.stringify(eventData)
  const domainEvent = deserializer.deserialize(eventSerialized)
  await eventBus.publish([domainEvent])
  await wait(500)
})

function buildDeserializer(): DomainEventDeserializer {
  const subscribers = DomainEventSubscribers.from(container)
  return DomainEventDeserializer.configure(subscribers)
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
