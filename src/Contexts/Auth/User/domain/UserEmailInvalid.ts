import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when an invalid user email is encountered.
 */
export class UserEmailInvalid extends InvalidArgumentError {}
