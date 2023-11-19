import { type Command } from '@Shared/domain/Command'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { type CommandHandlers } from './CommandHandlers'

/**
 * Implementation of a command bus that operates in-memory.
 */
export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly commandHandlers: CommandHandlers) {}

  /**
   * Dispatches the given command to its registered handler.
   * @param command - The command to be dispatched.
   */
  public async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command)
    await handler.handle(command)
  }
}
