const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser');
const { getTitleList, getProductList } = require('../services/product');

router.get('/hotTitle', async(req, res, next) => {
    const data = await getTitleList();
    res.json(data);
});

router.get('/list/:productName', async(req, res, next) => {
  const productName = req.params.productName;
  const data = await getProductList(productName);
  res.json(data);
});

//   router.post('/:productName', (req, res, next) => {
//     const productName = req.params.productName;
//     const { title, desc, username } = req.body;
//     const schema = productModel.createProduct({
//         title, desc, username,
//     });
//     res.json();
//   });

module.exports = router;