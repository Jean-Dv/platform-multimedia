import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents the title of a Backoffice multimedia serie,
 * ensuring it does not exceed a specified length.
 */
export class BackofficeMultimediaSerieTitleLengthIsExceeded extends InvalidArgumentError {}
