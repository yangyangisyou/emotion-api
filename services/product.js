const dynamoDB = require('../loaders/dynamoDB');

async function getTitleList() {
    // For dummy data
    const data = {
        code: 200,
        data: [
            {
                productName: 'Foodie',
                productNo: 10000,
            },
            {
                productName: 'Travel',
                productNo: 20000,
            },
            {
                productName: 'Stay home',
                productNo: 30000,
            }
        ]
    };

    return data;
};

async function getProductList(productName) {
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
    getProductList,
    getTitleList,
};