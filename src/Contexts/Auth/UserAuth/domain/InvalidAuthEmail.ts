import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when an authentication email is invalid.
 * Extends the base class `InvalidArgumentError`.
 */
export class InvalidAuthEmail extends InvalidArgumentError {}
