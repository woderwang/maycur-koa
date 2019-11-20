/**
 * 中间件集合
 */
'use strict';

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('../router');
const logMiddleware = require('./log');
const log = require('../common/log');
const responseFormat = require('./response_format');

module.exports = app => {
    // 捕获应用级错误
    app.on('error', err => {
        log.error('[server error]: ', err);
    });

    // 中间件列表
    app
        .use(cors())
        .use(
            bodyParser({
                enableTypes: ['json', 'form'],
                formLimit: '2mb',
                jsonLimit: '3mb',
            }),
        )
        .use(logMiddleware())
        .use(responseFormat())
        .use(router.routes())
        .use(router.allowedMethods())
        .use(async (ctx, next) => {
            if (ctx.status === 404) {
                ctx.throw(404, `path '${ctx.path}' not found`);
            }
            await next();
        });
};
