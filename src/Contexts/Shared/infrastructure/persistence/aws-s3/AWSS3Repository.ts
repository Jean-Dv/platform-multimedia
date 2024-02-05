import { type BackofficeMultimediaVideo } from './../../../../BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'

/**
 * This class is a base class for AWS S3 repositories.
 * It provides some basic methods to persist and retrieve
 * aggregate roots.
 */
export abstract class AWSS3Repository<T extends BackofficeMultimediaVideo> {
  constructor(private readonly _client: Promise<S3Client>) {}

  /**
   * Gets the name of the bucket to use.
   *
   * @returns The name of the bucket.
   */
  protected abstract bucketName(): string

  /**
   * Gets the AWS S3 client.
   *
   * @returns {S3Client} The AWS S3 client.
   */
  protected async client(): Promise<S3Client> {
    return await this._client
  }

  /**
   * This method persist data from an aggregate root.
   *
   * @param id - The id of the aggregate root.
   * @param aggregateRoot - The aggregate root to persist.
   */
  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    try {
      const client = await this.client()
      const stream = fs.createReadStream(aggregateRoot.path.value)
      const uploadParams = {
        Bucket: this.bucketName(),
        Key: id,
        Body: stream
      }
      const command = new PutObjectCommand(uploadParams)
      await client.send(command)
    } catch (error) {
      console.log(error)
    }
  }
}
