import { EnumValueObject } from '../value-objects/EnumValueObject'
import { InvalidArgumentError } from '../value-objects/InvalidArgumentError'

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

/**
 * Represents an enumerated value object for filter operators.
 * Extends the base class `EnumValueObject<Operator>`.
 */
export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator))
  }

  /**
   * Creates a FilterOperator instance from a string value.
   *
   * @param value - The string value representing the filter operator.
   * @returns An instance of FilterOperator.
   * @throws InvalidArgumentError if the provided value is not a valid filter operator.
   */
  public static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue)
      }
    }

    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  /**
   * Checks if the filter operator is positive (not negation).
   *
   * @returns True if the filter operator is positive, false otherwise.
   */
  public isPositive(): boolean {
    return (
      this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS
    )
  }

  /**
   * Throws an error for an invalid filter operator value.
   *
   * @param value - The invalid value that caused the error.
   * @throws InvalidArgumentError with a message indicating the value is invalid.
   */
  protected throwErrorForInvalidValue(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  /**
   * Creates an instance of FilterOperator representing the "EQUAL" operator.
   *
   * @returns An instance of FilterOperator with "EQUAL" value.
   */
  public static equal(): FilterOperator {
    return this.fromValue(Operator.EQUAL)
  }
}
