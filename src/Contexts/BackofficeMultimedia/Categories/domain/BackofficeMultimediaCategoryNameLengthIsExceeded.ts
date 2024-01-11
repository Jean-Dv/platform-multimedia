import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error indicating that the length of the Backoffice category name has exceeded the allowed limit.
 * Inherits from the InvalidArgumentError class, signifying an error due to an invalid argument.
 * This error is thrown when attempting to create or update a Backoffice category with a name exceeding the specified length.
 */
export class BackofficeMultimediaCategoryNameLengthIsExceeded extends InvalidArgumentError {}
