import { DomainEventDeserializer } from '@Shared/infrastructure/EventBus/DomainEventDeserializer'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'
import { container } from '../../../../../../src/apps/subscriptions/backend/dependency-injection'
import { Given } from '@cucumber/cucumber'
import { eventBus } from './hooks.steps'

const deserializer = buildDeserializer()

Given('the following event is received:', async (event: string) => {
  const domainEvent = deserializer.deserialize(event)
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
