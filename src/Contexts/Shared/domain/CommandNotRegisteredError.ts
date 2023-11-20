import { type Command } from './Command'

/**
 * Represents an error thrown when a command doesn't have a registered command handler.
 * Extends the base class `Error`.
 */
export class CommandNotRegisteredError extends Error {
  constructor(command: Command) {
    super(
      `The command <${command.constructor.name}> hasn't a command handler associated`
    )
  }
}
