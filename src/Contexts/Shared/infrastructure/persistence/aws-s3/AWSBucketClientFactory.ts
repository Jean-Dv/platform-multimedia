import { S3Client } from '@aws-sdk/client-s3'
import type AWSBucketConfig from './AWSBucketConfig'

/**
 * This class is a factory that creates and registers a AWS S3 client
 * for each context name. This way, we can have multiple connections to
 * different buckets.
 */
export class AWSBucketClientFactory {
  private static readonly clients: Record<string, S3Client> = {}

  /**
   * Creates a AWS S3 client and registers it if doesn't exist.
   *
   * @param contextName - The name of the context to create the client.
   * @param config - The configuration to create the client.
   * @returns The AWS S3 client.
   */
  public static async createClient(
    contextName: string,
    config: AWSBucketConfig
  ): Promise<S3Client> {
    let client = AWSBucketClientFactory.getClient(contextName)

    if (client == null) {
      client = await AWSBucketClientFactory.createAndConnectClient(config)
      AWSBucketClientFactory.registerClient(client, contextName)
    }
    return client
  }

  /**
   * Gets a AWS S3 client by context name.
   *
   * @param contextName - The name of the context to create the client.
   * @returns The AWS S3 client.
   */
  private static getClient(contextName: string): S3Client | null {
    return AWSBucketClientFactory.clients[contextName]
  }

  /**
   * Creates and connects a AWS S3 client.
   *
   * @param config - The configuration for the client.
   * @returns The AWS S3 client.
   */
  private static async createAndConnectClient(
    config: AWSBucketConfig
  ): Promise<S3Client> {
    const client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      },
      endpoint: config.endpoint,
      forcePathStyle: true
    })
    return client
  }

  /**
   * Registers a AWS S3 client by context name.
   *
   * @param client - The AWS S3 client to register.
   * @param contextName - The name of the context to register the client.
   */
  private static registerClient(client: S3Client, contextName: string): void {
    AWSBucketClientFactory.clients[contextName] = client
  }
}
