const dynamoDB = require('../loaders/dynamoDB');
const s3 = require('../loaders/s3');
const uuid = require('uuid');
const dayjs = require('dayjs');

async function uploadImage(payload) {
  const image = payload.image;
  const productId = payload.productId;
  const bufImage = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const imageName = uuid.v1();
  const ContentEncoding = 'base64';
  const ContentType = 'image/png';
  const result = await s3.uploadObject('yy-product-image', imageName, bufImage, ContentEncoding, ContentType);
  return { ...result, imageName, productId };
};

async function createProduct(payload) {
  const productId = uuid.v4();
  const currentDate = dayjs();
  const queryParams = {
    TableName: 'products',
    Item: {
      ...payload,
      productId: productId,
      createDate: currentDate.format('YYYY-MM-DD'),
      createTime: currentDate.format('HH:mm:ss Z'),
    },
  };
  const data = await dynamoDB.putItem(queryParams);
  return { ...data, productId };
};

async function getProductItem(productId) {
  const queryParams = {
      TableName: 'products',
      Key: {
        productId,
      },
  };
  const data = await dynamoDB.getItem(queryParams);
  return data;
};

async function updateProduct(payload) {
  const productId = payload.productId;
  const imageName = payload.imageName;
  const queryParams = {
    TableName: 'products',
    Key: {
      productId,
    },
    // step 1. 設定取值
    ExpressionAttributeNames: {
      '#imageName': 'imageName'
    },
    // step 2. 設定修改的目標
    UpdateExpression: "set #imageName = :val1",
    // step 3. 設定更新
    ExpressionAttributeValues: {
      ":val1": imageName,
    },
    // step 4. 回傳所有值
    ReturnValues: "ALL_NEW",
  };
  const data = await dynamoDB.updateItem(queryParams);
  return { ...data, productId };
};

async function getProductList(productType) {
    // const queryParams = {
    //   RequestItems: {
    //     products: {
    //       Keys: [{ productType }],
    //       // ProjectionExpression: 'productType, productName, description, userName, tag, createDate, picture'
    //     }
    //   },
    //   ReturnConsumedCapacity: 'TOTAL',
    // };
    // console.log('queryParams ->', queryParams);
    // console.log('queryParams ->', JSON.stringify(queryParams));

    // const data = await dynamoDB.batchGetItems(queryParams);
    const queryParams = {
      TableName: 'products',
      // FilterExpression: `#productType = :productType`,
      // ExpressionAttributeNames: {
      //   "#productType": "productType",
      // },
      // ExpressionAttributeValues: { ":productType": productType }
    };
    console.log('queryParams ->', queryParams);
    console.log('queryParams ->', JSON.stringify(queryParams));

    const data = await dynamoDB.scan(queryParams);

    return data;
};

module.exports = {
    uploadImage,
    updateProduct,
    createProduct,
    getProductList,
    getProductItem,
};