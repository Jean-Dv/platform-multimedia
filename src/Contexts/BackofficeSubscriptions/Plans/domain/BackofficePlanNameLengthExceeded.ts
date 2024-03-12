import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Exception for the case when the plan name has more than 100 characters.
 */
export class BackofficePlanNameLengthExceeded extends InvalidArgumentError {}
