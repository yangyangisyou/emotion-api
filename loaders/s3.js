
const AWS = require('aws-sdk');
// Set the region

const s3 = new AWS.S3({
  region: 'ap-northeast-1',
  apiVersion: '2021-02-01',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function createBucket() {
  s3.createBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.Location);
    }
  });
}

async function uploadObject(BucketName, fileName, content) {
  let uploadParams = { Bucket: BucketName, Key: '', Body: '' };
  let file = fileName;

  uploadParams.Body = content;
  let path = require('path');
  uploadParams.Key = path.basename(file);
  uploadParams.Key = fileName;
  console.log('uploadParams: ' + uploadParams);
  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log('Error', err);
    } if (data) {
      console.log('Upload Success', data.Location);
    }
  });
}

async function putObject(BucketName, fileName, content) {
  let putObjectParams = { Bucket: BucketName, Key: '', Body: '' };
  putObjectParams.Key = fileName;
  putObjectParams.Body = content;
  console.log('s3Proxy: FilePath:', BucketName + '/' + fileName);
  const promise = new Promise((resolve, reject) => {
    s3.putObject(putObjectParams, (err, data) => {
      if (err) {
        console.log('[Fail] s3Proxy Error', err);
        return reject(err);
      }
      console.log('[Success] s3Proxy putObject', data);
      return resolve(data);
    });
  });
  return promise;
}

async function getS3Object(fileName) {
  fileName = fileName.trim();
  let fileKey = encodeURIComponent(fileName);

  let params = {
    Key: fileKey,
    ResponseContentType: 'application/json'
  };

  const promise = new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err.code); // an error occurred
        if (err.code === 'NoSuchKey') {
          resolve('NotFound');
        }
        reject(err);
      } else {
        let content = data.Body.toString('ascii').replace(/\n/g, ',');
        content = '[' + content.substring(0, content.length - 1) + ']';
        resolve(JSON.parse(content));
      }
    });
  });

  return promise;
}


module.exports = {
  createBucket,
  putObject,
  uploadObject,
  getS3Object
};
