const express = require('express');
const apiRouter = require('./api-router');
const cors = require('cors')

const server = express();

server.use(cors())

// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin); //req.headers.origin // '*'
//     // res.header("Access-Control-Allow-Origin", '*'); //req.headers.origin // '*'
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
//     res.header('Access-Control-Allow-Credentials', true)
//     next();
// });

server.use(express.json());
server.use('/api', apiRouter);

module.exports = server;