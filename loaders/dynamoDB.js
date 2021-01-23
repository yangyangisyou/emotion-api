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

async function queryItem(queryParams) {
    const promise = new Promise(((resolve, reject) => {
      try {
        dynamodb.query(queryParams, (err, data) => {
          if (err) {
            console.error('[error] can not query item from DynamoDB ', err);
            resolve({ code: err.statusCode, data: null });
          } else {
            resolve({ code: 200, data: data });
          }
        });
      } catch (err) {
        console.error(err);
        resolve({ code: 500 });
      }
    }));
  
    return promise;
  }

async function getItem(params) {
    const promise = new Promise(((resolve, reject) => {
      try {
        dynamodb.get(params, (err, data) => {
          if (err) {
            console.log('[error] can not get item from DynamoDB ', err);
            resolve({ code: err.statusCode, data: null });
          } else {
            resolve({ code: 200, data: data.Item });
          }
        });
      } catch (err) {
        resolve({ code: 500 });
      }
    }));
    return promise;
}

async function batchGetItems(params) {
    const promise = new Promise(((resolve, reject) => {
      // TODO batchGet per 100
      try {
        dynamodb.batchGet(params, (err, data) => {
          if (err) {
            console.log('[error] can not batchGet item from DynamoDB ', err);
            resolve({ code: err.statusCode, data: null });
          } else {
            resolve({ code: 200, data: data.Responses });
          }
        });
      } catch (err) {
        resolve({ code: 500 });
      }
    }));
  
    return promise;
  }
  
  async function updateItem(params) {
    const promise = new Promise(((resolve, reject) => {
      try {
        dynamodb.update(params, (err, data) => {
          if (err) {
            console.log('[error] can not update item to DynamoDB ', err);
            resolve({ code: err.statusCode, data: null });
          } else {
            resolve({ code: 200, data: data.Item });
          }
        });
      } catch (err) {
        resolve({ code: 500 });
      }
    }));
  
    return promise;
  }
  
  async function putItem(params) {
    const promise = new Promise(((resolve, reject) => {
      try {
        dynamodb.put(params, (err, data) => {
          if (err) {
            console.log('[error] can not put item to DynamoDB ', err);
            resolve({ code: err.statusCode, message: '[error] can not put item to DynamoDB' });
          } else {
            resolve({ code: 200, message: '[Success] DynamoDB Put Item Success.' });
          }
        });
      } catch (err) {
        console.log('[error] can not write item to DynamoDB ', err, err.stack);
        resolve({ code: err.statusCode, message: '[error] can not put item to DynamoDB' });
      }
    }));
  
    return promise;
  }
  
  // 僅適用於單一table的batchWrite，會切分為多次上限25筆的請求
  async function batchWriteSingleTable(dataList, tableName) {
    let putRequestList = [];
    for (let data of dataList) {
      putRequestList.push({
        PutRequest: {
          Item: data,
        }
      });
  
      if (putRequestList.length == 25) {
        let requestItems = {};
        requestItems[tableName] = putRequestList;
  
        let params = {
          RequestItems: requestItems,
        };
  
        await batchWriteItem(params);
  
        putRequestList = [];
      }
    }
  
    if (putRequestList.length != 0) {
      let requestItems = {};
      requestItems[tableName] = putRequestList;
  
      let params = {
        RequestItems: requestItems,
      };
  
      await batchWriteItem(params);
    }
  }
  
  async function batchWriteItem(params) {
    console.log('batch write params = ', JSON.stringify(params));
    const promise = new Promise((resolve, reject) => {
      try {
        dynamodb.batchWrite(params, (err, data) => {
          if (err) {
            console.log('[error] can not batch write item to DynamoDB ', err);
            reject(err);
          } else {
            resolve({ code: 200, message: '[Success] DynamoDB batch write Item Success.' });
          }
        });
      } catch (err) {
        console.log('[error] can not batch write item to DynamoDB ', err, err.stack);
        resolve({ code: err.statusCode, message: '[error] can not batch write item to DynamoDB' });
      }
    });
    return promise;
  }
  
  async function deleteItem(params) {
    const promise = new Promise(((resolve, reject) => {
      try {
        dynamodb.delete(params, (err, data) => {
          if (err) {
            console.log('[error] can not delete item from DynamoDB ', err);
            resolve({ code: err.statusCode, message: '[error] can not delete item from DynamoDB' });
          } else {
            resolve({ code: 200, message: '[Success] DynamoDB Delete Item Success.' });
          }
        });
      } catch (err) {
        console.log('[error] can not delete item from DynamoDB ', err, err.stack);
        resolve({ code: err.statusCode, message: '[error] can not delete item from DynamoDB' });
      }
    }));
  
    return promise;
  }
  
  /** batch update  */
  async function transactWriteItem(params) {
  
    const promise = new Promise((resolve, reject) => {
      try {
        dynamodb.transactWrite(params, (err, data) => {
          if (err) {
            console.log('[error] can not transact write item to DynamoDB ', err);
            reject(err);
          } else {
            resolve({ code: 200, message: '[Success] DynamoDB transact write Item Success.', data: data });
          }
        });
      } catch (err) {
        console.log('[error] can not transact write item to DynamoDB ', err, err.stack);
        resolve({ code: err.statusCode, message: '[error] can not transact write item to DynamoDB' });
      }
    });
    return promise;
  }

  async function scan(scanParams) {
    const promise = new Promise(((resolve, reject) => {
      try {
        docClient.scan(scanParams, (err, data) => {
          if (err) {
            console.log('[error] can not scan item from DynamoDB ', err);
            resolve({ code: err.statusCode, data: null });
          } else {
            resolve({ code: 200, data: data });
          }
        });
      } catch (err) {
        resolve({ code: 500 });
      }
    }));
  
    return promise;
  }

module.exports = {
  getFromDatabase,
  queryItem,
  getItem,
  batchGetItems,
  updateItem,
  putItem,
  batchWriteSingleTable,
  batchWriteItem,
  deleteItem,
  transactWriteItem,
  scan,
};