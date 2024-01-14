/**
 * Interface defining the configuration for AWS S3 bucket connection.
 * This interface must be implemented to provide the necessary
 * configuration for connection to an AWS S3 bucket.
 *
 * @interface
 * @property bucketName - The name of the AWS S3 bucket.
 * @property region - The region of the AWS S3 bucket.
 * @property accessKeyId - The access key ID for the AWS S3 bucket.
 * @property secretAccessKey - The secret access key for the AWS S3 bucket.
 */

interface AWSBucketConfig {
  bucketName: string
  region: string
  accessKeyId: string
  secretAccessKey: string
}

export default AWSBucketConfig
