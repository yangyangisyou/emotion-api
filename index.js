const express = require('express');
const { productRouters } = require('./controllers');
const { port } = require('./config/setting');
const app = express();
/*
Follow this design: https://softwareontheroad.com/ideal-nodejs-project-structure/
*/
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', productRouters);

// HTTP server
const server = app.listen(port, () => {
console.log('\r\n/----- Launch server -----');
console.log(`Server started at ${port}...\r\n`);
})

module.exports = server;
