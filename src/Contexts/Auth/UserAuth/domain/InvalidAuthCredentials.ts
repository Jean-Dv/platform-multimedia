import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when authentication credentials are invalid.
 * Extends the base class `InvalidArgumentError`.
 */
export class InvalidAuthCredentials extends InvalidArgumentError {}
