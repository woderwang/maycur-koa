/**
 * response 格式化中间件
 */

'use strict';

const log = require('../common/log');

module.exports = function() {
    return async (ctx, next) => {
        try {
            await next();
            // ctx.body = {
            //     code: 0,
            //     success: true,
            //     content: ctx.body,
            //     message: null,
            // };
        } catch (err) {
            /* istanbul ignore next */
            ctx.status = err.status || 200;
            log.warn('server warn:', ctx.request.method, ctx.request.originalUrl, ctx.path, ctx.status);
            log.warn('server warn reqParams:', JSON.stringify(ctx.reqParams, null, '\t'));

            ctx.body = {
                code: err.code || 0,
                success: false,
                content: err.content || null,
                message: err.message,
            };
        }
    };
};
