const express = require('express');
const { productRouters } = require('./controllers');
const { port } = require('./config/setting');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
/*
Follow this design: https://softwareontheroad.com/ideal-nodejs-project-structure/
*/
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'https://product-demo.yyisyou.tw/');
    res.send('Welcome to use API.');
});

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/product', productRouters);

// HTTP server
const server = app.listen(port, function() {
console.log('\r\n/----- Launch server -----');
console.log(`Server started at ${port}...\r\n`);
});

module.exports = server;
