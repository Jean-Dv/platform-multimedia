/**
 * Inteface representing the connection settings for a service bus
 * with RabbitMQ.
 */
export interface ConnectionSettings {
  username: string
  password: string
  vhost: string
  connection: {
    secure: boolean
    hostname: string
    port: number
  }
}
