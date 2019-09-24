require('dotenv').config()
// Require AWS SDK for Node.js
const AWS = require('aws-sdk')
// Config AWS to use our region
AWS.config.update({
  region: 'us-east-1'
})
console.log(AWS)

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

module.exports = (key, file) => {
  // creating a promise to be run
  return new Promise((resolve, reject) => {
    // building a promise wiht parameters for s3 upload
    // Included: 'bucket' name, 'key'(file name), 'body'(file data)
    // and ACL to control acces(in this case public read)
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }
    // use the upload method to upload to s3 using params
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        // reject error
        reject(err)
        // or resolve with data
      } else {
        resolve(data)
      }
    })
  })
}
