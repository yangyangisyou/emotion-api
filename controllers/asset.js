const express = require('express')
const router = express.Router();
const { loadImageList, loadVideoList } = require('../services/asset');

router.get('/images/:keywords', async(req, res, next) => {
    const keywords = req.params.keywords;
    const data = await loadImageList(keywords);
    res.json(data);
});

router.get('/videos/:keywords', async(req, res, next) => {
    const keywords = req.params.keywords;
    const data = await loadVideoList(keywords);
    res.json(data);
});

module.exports = router;