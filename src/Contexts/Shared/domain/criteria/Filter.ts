import { InvalidArgumentError } from '../value-objects/InvalidArgumentError'
import { FilterField } from './FilterField'
import { FilterOperator } from './FilterOperator'
import { FilterValue } from './FilterValue'

/**
 * Represents a filter object consisting of a filter field, filter operator, and filter value.
 */
export class Filter {
  public readonly field: FilterField
  public readonly operator: FilterOperator
  public readonly value: FilterValue

  constructor(
    field: FilterField,
    operator: FilterOperator,
    value: FilterValue
  ) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  /**
   * Creates a Filter instance from a map of filter values.
   *
   * @param values - A map containing field, operator, and value for the filter.
   * @returns An instance of Filter.
   * @throws InvalidArgumentError if any of the required filter values is missing.
   */
  public static fromValues(values: Map<string, string>): Filter {
    const field = values.get('field')
    const operator = values.get('operator')
    const value = values.get('value')

    if (field == null || operator == null || value == null) {
      throw new InvalidArgumentError(`The filter is invalid`)
    }

    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(value)
    )
  }
}
