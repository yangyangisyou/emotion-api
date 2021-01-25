const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser');
const { getTitleList, getProductList } = require('../services/product');

router.get('/hotTitle', async(req, res, next) => {
    const data = await getTitleList();
    res.json(data);
});

router.get('/list/:productNo', async(req, res, next) => {
  const productNo = req.params.productNo;
  const data = await getProductList(productNo);
  res.json(data);
});

module.exports = router;