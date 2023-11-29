import { EnumValueObject } from '../value-objects/EnumValueObject'
import { InvalidArgumentError } from '../value-objects/InvalidArgumentError'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

/**
 * Represents an enumerated value object for order types.
 * Extends the base class `EnumValueObject<OrderTypes>`.
 */
export class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes))
  }

  /**
   * Creates an OrderType instance from a string value.
   *
   * @param value - The string value representing the order type.
   * @returns An instance of OrderType.
   * @throws InvalidArgumentError if the provided value is not a valid order type.
   */
  public static fromValue(value: string): OrderType {
    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue)
      }
    }
    throw new InvalidArgumentError(`The order type <${value}> is invalid`)
  }

  /**
   * Checks if the order type is "NONE".
   *
   * @returns True if the order type is "NONE", false otherwise.
   */
  public isNone(): boolean {
    return this.value === OrderTypes.NONE
  }

  /**
   * Checks if the order type is "ASC".
   *
   * @returns True if the order type is "ASC", false otherwise.
   */
  public isAsc(): boolean {
    return this.value === OrderTypes.ASC
  }

  /**
   * Throws an error for an invalid order type value.
   *
   * @param value - The invalid value that caused the error.
   * @throws InvalidArgumentError with a message indicating the value is invalid.
   */
  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`The order type <${value}> is invalid`)
  }
}
