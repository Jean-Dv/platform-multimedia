import { type Plan } from '../domain/Plan'

interface PlanResponse {
  id: string
  name: string
  price: number
  duration: number
  description: string
}

/**
 * Represents a response with the plans.
 */
export class PlansResponse {
  public readonly plans: PlanResponse[]

  constructor(plans: Plan[]) {
    this.plans = plans.map((plan) => plan.toPrimitives())
  }
}
