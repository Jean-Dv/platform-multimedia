import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error indicating that the release year of the Backoffice movie is negative.
 * Inherits from the InvalidArgumentError class, signifying an error due to an invalid argument.
 * This error is thrown when attempting to create or update a Backoffice movie with a negative release year.
 */
export class BackofficeMultimediaMovieReleaseYearIsNegative extends InvalidArgumentError {}
