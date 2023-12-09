import { type Command } from './Command'

/**
 * Interface representing a command bus for dispatching commands.
 */
export interface CommandBus {
  /**
   * Dispatches the given command for execution.
   * @param command - The command to be dispatched.
   * @returns A Promise that resolves once the command is processed.
   */
  dispatch: (command: Command) => Promise<void>
}
