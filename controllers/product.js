const express = require('express')
const router = express.Router();
const { getTitleList, getProductList, createProduct, uploadImage } = require('../services/product');

router.get('/hotTitle', async(req, res, next) => {
    const data = await getTitleList();
    res.json(data);
});

router.get('/list/:productCat', async(req, res, next) => {
  const productCat = req.params.productCat;
  const data = await getProductList(productCat);
  res.json(data);
});

router.post('/upload/image', async(req, res, next) => {
  const body = req.body;
  console.log('req==>', req);
  console.log('body==>', body);
  console.log('data==>', body.data);
  if(body) {
    const data = await uploadImage(body);
    if(data.code === 200) {
      res.json({
        success: true,
        message: 'success-upload-image',
      });
    } else {
      res.status(400).json(
        {
          success: false,
          message: 'fail-upload-image-to-s3',
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
        message: 'success-create-item',
        productId: data.productId,
      });
    } else {
      res.status(400).json(
        {
          success: false,
          message: 'fail-create-item-to-database',
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