const express = require('express');
const { productRouters, assetRouters } = require('./controllers');
const { port } = require('./config/setting');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const app = express();

/*
Follow this design: https://softwareontheroad.com/ideal-nodejs-project-structure/
*/
app.get('/', (req, res) => {
    res.send('Welcome to use API.');
});

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/product', productRouters);
app.use('/asset', assetRouters);

// HTTP server
const server = app.listen(port, function() {
console.log('\r\n/----- Launch server -----');
console.log(`Server started at ${port}...\r\n`);
});


module.exports = server;
