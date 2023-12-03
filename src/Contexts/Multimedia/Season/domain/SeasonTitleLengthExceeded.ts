import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when the season title exceeds the maximum length.
 */
export class SeasonTitleLengthExceeded extends InvalidArgumentError {}
