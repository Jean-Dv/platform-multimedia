import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when the provided movie name exceeds 100 characters.
 */
export class MovieTitleLengthExceeded extends InvalidArgumentError {}
