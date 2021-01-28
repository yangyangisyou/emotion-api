const express = require('express')
const router = express.Router();
const { loadImageList, loadVideoList } = require('../services/asset');

router.get('/images/:keywords', async(req, res, next) => {
    const keywords = req.params.keywords;
    const data = await loadImageList(keywords);
    console.log('images data: ',data);
    res.json(data);
});

router.get('/videos/:keywords', async(req, res, next) => {
    const keywords = req.params.keywords;
    const data = await loadVideoList(keywords);
    console.log('videos data: ',data);
    res.json(data);
});

module.exports = router;