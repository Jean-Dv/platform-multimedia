import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Error message for when a user already exists in the system.
 */
export class UserExists extends InvalidArgumentError {}
