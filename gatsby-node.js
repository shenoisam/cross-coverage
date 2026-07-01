// gatsby-node.js
const AWS = require("aws-sdk")
const stringify = require("safe-stable-stringify");
const path = require("path")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
   const { createNode } = actions
   const s3 = new AWS.S3({ logger: undefined,region: "us-east-1", credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
          }})
    const res = await s3.listObjectsV2({
        Bucket: "crosscoverage",
    }).promise()


        res.Contents.forEach(async obj => {
            const file = await s3.getObject({
              Bucket: "crosscoverage",
              Key: obj.Key,
            }).promise()

            const body = file.Body.toString("utf-8")

            createNode({
                id: createNodeId(`s3-${obj.Key}`),
                key: obj.Key,
                size: obj.Size ?? 0,
                content: body,
                internal: {
                type: "MyS3Object",
                contentDigest: createContentDigest(body),
                },
            })
        })
    }

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MyS3Object implements Node {
      key: String!
      size: Int
      content: String
    }
  `)
}
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // Example: Fetching data to generate individual blog posts
  const result = await graphql(`
   query MyQuery {
      allMyS3Object {
        nodes {
          key
          content
        }
      }
    }
  `);
  const CrosswordPuzzle = path.resolve(`./src/templates/crosswordpuzzle.js`)
  console.log(CrosswordPuzzle)
  result.data.allMyS3Object.nodes.forEach(node => {


    createPage({
      path: `/puzzles/${node.key.replace(/\.json$/, "")}`,
      component: CrosswordPuzzle,
      context: {
        // This 'id' key automatically becomes a $id variable in your template query
        id: node.key,
        content: node.content
      },
    });
  });
};