import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Exception for the case when the plan days duration is negative.
 */
export class BackofficePlanDaysDurationIsNegative extends InvalidArgumentError {}
