const port = process.env.PORT || 8000;
const PIXABAY_PATH = 'https://pixabay.com/api';
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
console.log('PIXABAY_API_KEY ', PIXABAY_API_KEY);
module.exports = {
    port,
    PIXABAY_PATH,
    PIXABAY_API_KEY,
};