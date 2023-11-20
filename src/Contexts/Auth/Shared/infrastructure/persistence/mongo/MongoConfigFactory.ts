import config from '../../config'
import type MongoConfig from '@Shared/infrastructure/persistence/mongo/MongoConfig'

const mongoConfig: MongoConfig = {
  url: config.get('mongo.url')
}

/**
 * This class is used to create the MongoConfig object
 * that will be used by the MongoClientFactory class.
 * This is done to avoid importing the config object
 * in the MongoClientFactory class.
 */
export class MongoConfigFactory {
  /**
   * This method creates the MongoConfig object
   * that will be used by the MongoClientFactory class.
   *
   * @returns The MongoConfig object.
   */
  public static createConfig(): MongoConfig {
    return mongoConfig
  }
}
