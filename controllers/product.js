const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser');
const { getProduct } = require('../services/product');

router.get('/:productName', async(req, res, next) => {
    const productName = req.params.productName;
    const data = await getProduct(productName);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'https://product-demo.yyisyou.tw/');
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