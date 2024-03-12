import {
  DeleteBucketCommand,
  ListBucketsCommand,
  type S3Client
} from '@aws-sdk/client-s3'
import { EnvironmentArranger } from '../EnvironmentArranger'

/**
 * A class that arranges and cleans up an AWS S3 environment
 * for testing or development purposes.
 */
export class AWSS3EnvironmentArranger extends EnvironmentArranger {
  constructor(private readonly _client: Promise<S3Client>) {
    super()
  }

  /**
   * Arranges the AWS S3 environment by cleaning the bucket,
   * removing data from all objects.
   */
  public async arrange(): Promise<void> {
    await this.cleanBucket()
  }

  /**
   * Cleans the AWS S3 bucket by deleting data from all objects.
   *
   * @returns A promise that resolves when the AWS S3 bucket has been
   */
  protected async cleanBucket(): Promise<void> {
    const client = await this.client()
    const buckets = await this.buckets()
    for (const bucket of buckets) {
      const command = new DeleteBucketCommand({ Bucket: bucket })
      await client.send(command)
    }
  }

  /**
   * Retrieves a list of bucket names from the AWS S3 bucket.
   *
   * @returns A promise that resolves to an array of bucket names.
   */
  protected async buckets(): Promise<string[]> {
    const client = await this.client()
    const buckets = new ListBucketsCommand({})
    try {
      const { Buckets } = await client.send(buckets)
      if (Buckets == null) {
        return []
      }
      return Buckets.map((b) => b.Name as string)
    } catch (error) {
      return []
    }
  }

  /**
   * Retrieves the AWS S3 client for bucket access.
   *
   * @returns A promise that resolves to the AWS S3 client.
   */
  protected async client(): Promise<S3Client> {
    return await this._client
  }

  /**
   * Cleans up and closes the AWS S3 environment.
   */
  public async close(): Promise<void> {}
}
