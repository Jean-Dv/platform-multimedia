import multimediaConfig from '../../config'
import type AWSBucketConfig from '@Shared/infrastructure/persistence/aws-s3/AWSBucketConfig'

const awsBucketConfig: AWSBucketConfig = {
  bucketName: multimediaConfig.get('aws.s3.bucketName'),
  accessKeyId: multimediaConfig.get('aws.s3.accessKeyId'),
  secretAccessKey: multimediaConfig.get('aws.s3.secretAccessKey'),
  region: multimediaConfig.get('aws.s3.region'),
  endpoint: multimediaConfig.get('aws.s3.endpoint')
}

/**
 * This class is used to create the AWSBucketConfig object
 * that will be used by the AWSBucketFactory class.
 * This is done to avoid importing the config object
 * in the AWSBucketFactory class.
 */
export class AWSBucketConfigFactory {
  /**
   * This method creates the AWSBucketConfig object
   * that will be used by the AWSBucketFactory class.
   *
   * @returns The AWSBucketConfig object.
   */
  public static createConfig(): AWSBucketConfig {
    return awsBucketConfig
  }
}
