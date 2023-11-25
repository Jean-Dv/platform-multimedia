import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when the provided movie duration is not a positive number.
 */
export class MovieDurationIsNotPositive extends InvalidArgumentError {}
