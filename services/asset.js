const fetch = require('node-fetch');
const dayjs = require('dayjs');
const { PIXABAY_PATH, PIXABAY_API_KEY, NEWS_PATH, NEWS_API_KEY, } = require('../config/setting');

async function loadImageList(keyword) {
    // Accepted values: "all", "photo", "illustration", "vector"
    const imageType = 'photo';
    const data = await fetch(`${PIXABAY_PATH}/?q=${encodeURIComponent(keyword)}&image_type=${imageType}&key=${PIXABAY_API_KEY}`)
        .then(res => res.json())
        .then(json => json);
    return data;
}

async function loadVideoList(keyword) {
    // Accepted values: "all", "film", "animation"
  const videoType = 'film';
    const data = await fetch(`${PIXABAY_PATH}/videos/?q=${encodeURIComponent(keyword)}&video_type=${videoType}&key=${PIXABAY_API_KEY}`)
        .then(res => res.json())
        .then(json => json);
    return data;
}

// optional parameters: 
// & sources = cnn,bbc
// & categories = business,sports
// & countries = us,au
// & languages = en,-de
// & keywords = virus,-corona
// & date = 2020-02-19
// & sort = published_desc
// & offset = 0
// & limit = 100

async function loadNewsList(keyword) {
    const queryString = `keyword=${keyword}&date=${dayjs().format('YYYY-MM-DD')}&countries=us&languages=en&limit=10`;
    const data = await fetch(`${NEWS_PATH}/news?${queryString}&access_key=${NEWS_API_KEY}`)
        .then(res => res.json())
        .then(json => json);
    return data;
}

module.exports = {
    loadImageList,
    loadVideoList,
    loadNewsList,
};