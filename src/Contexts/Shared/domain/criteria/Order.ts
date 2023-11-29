import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

/**
 * Represents an order consisting of order by criteria and order type.
 */
export class Order {
  public readonly orderBy: OrderBy
  public readonly orderType: OrderType

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  /**
   * Creates an Order instance from optional order by and order type values.
   * If no order by is provided, returns an instance representing no order.
   *
   * @param orderBy - The criteria for ordering.
   * @param orderType - The type of ordering (ASC, DESC, or NONE).
   * @returns An instance of Order.
   */
  public static fromValues(orderBy?: string, orderType?: string): Order {
    if (orderBy === null || orderBy === undefined || orderBy === '') {
      return Order.none()
    }

    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType ?? OrderTypes.ASC)
    )
  }

  /**
   * Creates an instance of Order representing no order.
   *
   * @returns An instance of Order with NONE order type.
   */
  public static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE))
  }

  /**
   * Creates an instance of Order representing descending order.
   *
   * @param orderBy - The criteria for ordering.
   * @returns An instance of Order with DESC order type.
   */
  public static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC))
  }

  /**
   * Creates an instance of Order representing ascending order.
   *
   * @param orderBy - The criteria for ordering.
   * @returns An instance of Order with ASC order type.
   */
  public static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC))
  }

  /**
   * Checks if the order has any order type (not NONE).
   *
   * @returns True if the order has an order type, false otherwise.
   */
  public hasOrder(): boolean {
    return !this.orderType.isNone()
  }
}
