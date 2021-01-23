var { ACCESS_KEY, SERECT_ACCESS_KEY } = require('../config/key.js');
var AWS = require("aws-sdk");
// https://docs.aws.amazon.com/zh_tw/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
AWS.config.update({
  region: "ap-northeast-1",
  apiVersion: '2021-01-01',
  endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SERECT_ACCESS_KEY,
});

var dynamodb = new AWS.DynamoDB.DocumentClient();

// var schema = {
//     TableName : "card-api",
//     Key: {
//         "CardName": 'food',
//     },
// };

function generateSchema(tableName, payload) {
    return {
        TableName : tableName,
        Key: payload,
    };
}

function getFromDatabase(tableName, payload) {
    const schema = generateSchema(tableName, payload);
    dynamodb.get(schema, function(err, data) {
        if (err) {
            console.error("Unable to get table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("got table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

function getFromDatabase(tableName, payload) {
    const schema = generateSchema(tableName, payload);
    dynamodb.put(schema, function(err, data) {
        if (err) {
            console.error("Unable to get table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("got table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

module.exports = {
    getFromDatabase,
};