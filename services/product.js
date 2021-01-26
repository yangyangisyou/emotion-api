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

async function getProductList(productCat) {
    const queryParams = {
        TableName: 'product',
        Key: {
            productCat: productCat,
        },
    };
    // const data = await dynamoDB.getItem(queryParams);
    // For dummy data
    switch(productCat) {
        case '10000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', productNo: 1,description: 'It tastes like the pudding.', userName: 'Joanne', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Noodles', productNo: 2,description: 'We can also cooks noodles at home.', userName: 'Joe', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Drink', productNo: 3,description: 'Drinks all arounds our life.', userName: 'Coco', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Cake', productNo: 4,description: 'I found a dream cake in my life.', userName: 'Danny', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                ]
            };
        }
        case '20000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', productNo: 5,description: 'It tastes like the pudding.', userName: 'Joanne', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', productNo: 6,description: 'nice', userName: 'Coco', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', productNo: 7,description: 'nice', userName: 'Coco', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                ]
            };
        }
        case '30000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', productNo: 8,description: 'It tastes like the pudding.', userName: 'Joanne', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', productNo: 9,description: 'nice', userName: 'Coco', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', productNo: 10,description: 'nice', userName: 'Coco', productCat: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                ]
            };
        }
        default: {
            return {};
        }
    }
    // return data;
};

module.exports = {
    getProductList,
    getTitleList,
};