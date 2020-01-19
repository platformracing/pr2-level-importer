const AWS = require('aws-sdk') // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs')
const s3 = new AWS.S3()
const bucket = process.env.BUCKET || 'test-bucket'
const saveTarget = process.env.SAVE_TARGET || 's3'

const fetchFile = async (key) => {
  if (saveTarget === 's3') {
    try {
      const result = await s3.getObject({
        Bucket: bucket,
        Key: key
      }).promise()
      return result.Body.toString()
    } catch (e) {
      console.log(e)
      return undefined
    }
  } else if (saveTarget === 'local') {
    try {
      return fs.readFileSync(`./stashed/${key}`).toString()
    } catch (e) {
      console.log(e)
      return undefined
    }
  }
}

module.exports = fetchFile
