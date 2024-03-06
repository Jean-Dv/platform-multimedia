import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Exception for the case when the plan price is negative.
 */
export class BackofficePlanPriceIsNegative extends InvalidArgumentError {}
