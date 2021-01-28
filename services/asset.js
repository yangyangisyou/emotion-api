const fetch = require('node-fetch');
const { PIXABAY_PATH, PIXABAY_API_KEY } = require('../config/setting');

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

module.exports = {
    loadImageList,
    loadVideoList,
};