import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Represents an error thrown when the chapter title exceeds the maximum length.
 */
export class ChapterTitleLengthExceeded extends InvalidArgumentError {}
