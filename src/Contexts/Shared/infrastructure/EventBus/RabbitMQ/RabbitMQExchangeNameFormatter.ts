/**
 * Class providing static methods to format RabbitMQ exchange names.
 */
export class RabbitMQExchangeNameFormatter {
  /**
   * Formats the exchange name for retry purposes.
   *
   * @param exchangeName - The original exchange name.
   * @returns The formatted retry exchange name.
   */
  public static retry(exchangeName: string): string {
    return `retry-${exchangeName}`
  }

  /**
   * Formats the exchange name for dead letter purposes.
   *
   * @param exchangeName - The original exchange name.
   * @returns The formatted dead letter exchange name.
   */
  public static deadLetter(exchangeName: string): string {
    return `dead_letter-${exchangeName}`
  }
}
