/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();
const AWS = require("aws-sdk")

AWS.config.update({
  region: "us-east-2",
  logger: console,   // 🔥 forces AWS to log requests + responses
})

const data = {
  siteMetadata: {
    title: `CrossCoverage`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
      resolve: `gatsby-source-s3`,
      options: {
        aws: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
          region: 'us-east-2',
        },
        buckets: ["crosscoverage"],
        expiration: 120,
      },
    }



    /*"gatsby-plugin-google-gtag", "gatsby-plugin-sitemap"*/]
};
module.exports = data