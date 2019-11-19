'use strict';

const Koa = require('koa');
const config = require('./config');
const middleware = require('./middleware');
const log = require('./common/log');

const app = new Koa();

// 中间件
middleware(app);

const server = app.listen(config.port, '0.0.0.0', () => {
    log.info('Server listening on port: ' + server.address().port);
});

module.exports = app;
