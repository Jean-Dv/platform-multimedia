import { type Command } from './Command'

/**
 * Interface representing a command handler.
 */
export interface CommandHandler<T extends Command> {
  /**
   * Specifies the type of command that the handler subscribes to.
   * @returns The command type.
   */
  subscribedTo: () => Command

  /**
   * Handles the given command.
   * @param command - The command to be handled.
   * @returns A Promise that resolves once the command is processed.
   */
  handle: (command: T) => Promise<void>
}
