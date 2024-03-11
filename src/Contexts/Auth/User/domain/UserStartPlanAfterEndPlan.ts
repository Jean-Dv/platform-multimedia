import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

/**
 * Exception thrown when a user tries to start a plan after the end date of the plan.
 */
export class UserStartPlanAfterEndPlan extends InvalidArgumentError {}
