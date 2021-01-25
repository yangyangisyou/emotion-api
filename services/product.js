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

async function getProductList(productNo) {
    const queryParams = {
        TableName: 'product',
        Key: {
            productNo: productNo,
        },
    };
    // const data = await dynamoDB.getItem(queryParams);
    // For dummy data
    switch(productNo) {
        case '10000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Noodles', description: 'We can also cooks noodles at home.', userName: 'Joe', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Drink', description: 'Drinks all arounds our life.', userName: 'Coco', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'Cake', description: 'I found a dream cake in my life.', userName: 'Danny', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                ]
            };
        }
        case '20000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', description: 'nice', userName: 'Coco', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', description: 'nice', userName: 'Coco', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                ]
            };
        }
        case '30000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', description: 'nice', userName: 'Coco', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
                    },
                    {
                      productName: 'tofu', description: 'nice', userName: 'Coco', productNo: '10000', imageLink: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
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