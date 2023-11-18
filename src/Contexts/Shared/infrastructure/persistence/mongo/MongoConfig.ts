/**
 * Interface defining the configuration for MongoDB connection.
 * This interface must be implemented to provide the necessary
 * configuration for connection to a MongoDB instance.
 *
 * @interface
 * @property url - The URL of the MongoDB instance.
 */
interface MongoConfig {
  url: string
}

export default MongoConfig
