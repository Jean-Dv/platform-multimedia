import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error indicating that the title of the Backoffice season exceeds the maximum length.
 * Inherits from the InvalidArgumentError class, signifying an error due to an invalid argument.
 * This error is thrown when attempting to create or update a Backoffice season with a title that exceeds the maximum length.
 */
export class BackofficeMultimediaSeasonTitleLengthIsExceeded extends InvalidArgumentError {}
