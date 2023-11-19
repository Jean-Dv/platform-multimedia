import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when a user password is not considered strong.
 */
export class UserPasswordIsNotStrong extends InvalidArgumentError {}
