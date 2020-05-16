const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const responseTime = require('response-time');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());
app.set('port', process.env.PORT || 3600);

app.use('/', (req, res, next) => {
    return res.status(200).json({ 'message': 'Hello World' });
});
module.exports = Object.assign({}, { app });