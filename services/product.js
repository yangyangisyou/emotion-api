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
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', avatar: 'https://scitechdaily.com/images/Cat-COVID-19-Mask-777x518.jpg', picture: 'https://fairylolita.com/wp-content/uploads/DSCF4415.jpg',
                    },
                    {
                      productName: 'Noodles', description: 'We can also cooks noodles at home.', userName: 'Joe', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://tw.savorjapan.com/gg/content_image/t0039_002_20180115022046.jpg',
                    },
                    {
                      productName: 'Drink', description: 'Drinks all arounds our life.', userName: 'Coco', productNo: '10000', avatar: 'https://www.thelabradorsite.com/wp-content/uploads/2017/09/Cute-Dog-Names-LS-long-696x377.jpg', picture: 'https://www.gomaji.com/blog/wp-content/uploads/2020/02/l-59-696x464.jpg',
                    },
                    {
                      productName: 'Cake', description: 'I found a dream cake in my life.', userName: 'Danny', productNo: '10000', avatar: 'https://www.humanesociety.org/sites/default/files/styles/1441x612/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=HVqvfhtg', picture: 'https://ct.yimg.com/xd/api/res/1.2/18aRArwk57wluetN8IjX0g--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD02ODI7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/86b398ca-8103-4f74-98f9-e7a539e03495.jpg',
                    },
                    {
                      productName: 'Candy', description: 'Candy!!!', userName: 'Shally', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://meethub.bnext.com.tw/wp-content/uploads/2018/08/Candy-Cover-1038x693.jpg',
                    },
                ]
            };
        }
        case '20000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', avatar: 'https://scitechdaily.com/images/Cat-COVID-19-Mask-777x518.jpg', picture: 'https://fairylolita.com/wp-content/uploads/DSCF4415.jpg',
                    },
                    {
                      productName: 'Noodles', description: 'We can also cooks noodles at home.', userName: 'Joe', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://tw.savorjapan.com/gg/content_image/t0039_002_20180115022046.jpg',
                    },
                    {
                      productName: 'Drink', description: 'Drinks all arounds our life.', userName: 'Coco', productNo: '10000', avatar: 'https://www.thelabradorsite.com/wp-content/uploads/2017/09/Cute-Dog-Names-LS-long-696x377.jpg', picture: 'https://www.gomaji.com/blog/wp-content/uploads/2020/02/l-59-696x464.jpg',
                    },
                    {
                      productName: 'Cake', description: 'I found a dream cake in my life.', userName: 'Danny', productNo: '10000', avatar: 'https://www.humanesociety.org/sites/default/files/styles/1441x612/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=HVqvfhtg', picture: 'https://ct.yimg.com/xd/api/res/1.2/18aRArwk57wluetN8IjX0g--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD02ODI7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/86b398ca-8103-4f74-98f9-e7a539e03495.jpg',
                    },
                    {
                      productName: 'Candy', description: 'Candy!!!', userName: 'Shally', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://meethub.bnext.com.tw/wp-content/uploads/2018/08/Candy-Cover-1038x693.jpg',
                    },
                ]
            };
        }
        case '30000': {
            return {
                code: 200,
                data: [
                    {
                      productName: 'Tofu', description: 'It tastes like the pudding.', userName: 'Joanne', productNo: '10000', avatar: 'https://scitechdaily.com/images/Cat-COVID-19-Mask-777x518.jpg', picture: 'https://fairylolita.com/wp-content/uploads/DSCF4415.jpg',
                    },
                    {
                      productName: 'Noodles', description: 'We can also cooks noodles at home.', userName: 'Joe', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://tw.savorjapan.com/gg/content_image/t0039_002_20180115022046.jpg',
                    },
                    {
                      productName: 'Drink', description: 'Drinks all arounds our life.', userName: 'Coco', productNo: '10000', avatar: 'https://www.thelabradorsite.com/wp-content/uploads/2017/09/Cute-Dog-Names-LS-long-696x377.jpg', picture: 'https://www.gomaji.com/blog/wp-content/uploads/2020/02/l-59-696x464.jpg',
                    },
                    {
                      productName: 'Cake', description: 'I found a dream cake in my life.', userName: 'Danny', productNo: '10000', avatar: 'https://www.humanesociety.org/sites/default/files/styles/1441x612/public/2018/08/kitten-440379.jpg?h=c8d00152&itok=HVqvfhtg', picture: 'https://ct.yimg.com/xd/api/res/1.2/18aRArwk57wluetN8IjX0g--/YXBwaWQ9eXR3YXVjdGlvbnNlcnZpY2U7aD02ODI7cT04NTtyb3RhdGU9YXV0bzt3PTcwMA--/https://s.yimg.com/ob/image/86b398ca-8103-4f74-98f9-e7a539e03495.jpg',
                    },
                    {
                      productName: 'Candy', description: 'Candy!!!', userName: 'Shally', productNo: '10000', avatar: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', picture: 'https://meethub.bnext.com.tw/wp-content/uploads/2018/08/Candy-Cover-1038x693.jpg',
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
    uploadImage,
    updateProduct,
    createProduct,
    getProductList,
    getTitleList,
    getProductItem,
};