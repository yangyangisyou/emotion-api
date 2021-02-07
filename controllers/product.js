const express = require('express')
const router = express.Router();
const { getProductList, createProduct, uploadImage, updateProduct, getProductItem } = require('../services/product');

router.get('/list/:productType', async(req, res, next) => {
  const productType = req.params.productType;
  const result = await getProductList(productType);
  console.log('result in getProductList', result);
  if(result.code === 200) {
    res.json({
      success: true,
      message: 'load-product-list-success',
      data: result.data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'load-product-list-fail',
    });
  }
});

router.get('/item/:productId', async(req, res, next) => {
  const productId = req.params.productId;
  const result = await getProductItem(productId);
  console.log('data /product: ', result);
  if(result.code === 200) {
    res.json({
      success: true,
      message: 'load-product-item-success',
      data: result.data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'load-product-item-fail',
    });
  }
});

router.post('/upload/image', async(req, res, next) => {
  const body = req.body;
  if(body) {
    const data = await uploadImage(body);
    if(data.code === 200) {
      const imageName = data.imageName;
      const productId = data.productId;
      const updateDatabaseResult = await updateProduct({
        imageName: imageName,
        productId: productId,
      });
      if(updateDatabaseResult.code === 200) {
        res.json({
          success: true,
          message: 'upload-image-success',
          data: {
            imageName, productId,
          },
        });
      } else {
        res.status(400).json(
          {
            success: false,
            message: 'upload-image-to-database-fail',
          }
        );
      }
    } else {
      res.status(400).json(
        {
          success: false,
          message: 'upload-image-to-s3-fail',
        }
      );
    }
  } else {
    res.status(403).json(
      {
        success: false,
        message: 'not-allow-upload-image',
      }
    );
  }
});


router.post('/create', async(req, res, next) => {
  const body = req.body;
  console.log('body==>', body);
  if(body) {
    const data = await createProduct(body);
    if(data.code === 200) {
      res.json({
        success: true,
        message: 'create-item-success',
        productId: data.productId,
      });
    } else {
      res.status(400).json(
        {
          success: false,
          message: 'create-item-to-database-fail',
        }
      );
    }
  } else {
    res.status(403).json(
      {
        success: false,
        message: 'not-allow-create-item',
      }
    );
  }
});

module.exports = router;