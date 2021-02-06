require('dotenv').config();
const port = process.env.PORT || 8000;
const PIXABAY_PATH = 'https://pixabay.com/api';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const NEWS_PATH = 'http://api.mediastack.com/v1/';
const NEWS_API_KEY = process.env.NEWS_KEY;

module.exports = {
    port,
    PIXABAY_PATH,
    PIXABAY_API_KEY,
    NEWS_PATH,
    NEWS_API_KEY,
};