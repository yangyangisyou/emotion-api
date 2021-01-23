const dynamoDB = require('../loaders/dynamoDB');

async function getProduct(productName) {
    const queryParams = {
        TableName: 'product',
        Key: {
            ProductName: productName,
        },
    };
    const data = await dynamoDB.getItem(queryParams);
    return data;
};

module.exports = {
    getProduct,
};