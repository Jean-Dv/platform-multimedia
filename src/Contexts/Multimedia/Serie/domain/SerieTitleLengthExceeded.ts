import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when the provided serie name exceeds 100 characters.
 */
export class SerieTitleLengthExceeded extends InvalidArgumentError {}
