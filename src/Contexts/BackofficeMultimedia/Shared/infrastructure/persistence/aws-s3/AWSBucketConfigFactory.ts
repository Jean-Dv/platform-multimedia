import backofficeMultimediaConfig from '../../config'
import type AWSBucketConfig from '@Shared/infrastructure/persistence/aws-s3/AWSBucketConfig'

const awsBucketConfig: AWSBucketConfig = {
  bucketName: backofficeMultimediaConfig.get('aws.s3.bucketName'),
  accessKeyId: backofficeMultimediaConfig.get('aws.s3.accessKeyId'),
  secretAccessKey: backofficeMultimediaConfig.get('aws.s3.secretAccessKey'),
  region: backofficeMultimediaConfig.get('aws.s3.region'),
  endpoint: backofficeMultimediaConfig.get('aws.s3.endpoint')
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
