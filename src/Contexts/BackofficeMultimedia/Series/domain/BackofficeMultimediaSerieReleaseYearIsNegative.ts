import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents the release year of a Backoffice multimedia serie,
 * ensuring it is not negative.
 */
export class BackofficeMultimediaSerieReleaseYearIsNegative extends InvalidArgumentError {}
