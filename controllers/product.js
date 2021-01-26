const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser');
const { getTitleList, getProductList } = require('../services/product');

router.get('/hotTitle', async(req, res, next) => {
    const data = await getTitleList();
    res.json(data);
});

router.get('/list/:productCat', async(req, res, next) => {
  const productCat = req.params.productCat;
  const data = await getProductList(productCat);
  res.json(data);
});

module.exports = router;