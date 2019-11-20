/**
 * response 格式化中间件
 */

'use strict';

const log = require('../common/log');

module.exports = function() {
    return async (ctx, next) => {
        try {
            await next();
            // 兼容旧接口
            if (!(ctx.request.method === 'GET' && ctx.path.indexOf('/dev-account/') >= 0)) {
                ctx.body = {
                    code: 'ACK',
                    data: ctx.body,
                    message: null,
                };
            }
        } catch (err) {
            /* istanbul ignore next */
            ctx.status = err.status || 200;
            log.warn('server warn:', ctx.request.method, ctx.request.originalUrl, ctx.path, ctx.status);
            log.warn('server warn reqParams:', JSON.stringify(ctx.reqParams, null, '\t'));
            log.error(err);

            ctx.body = {
                code: null,
                data: null,
                message: err.message,
            };
        }
    };
};
