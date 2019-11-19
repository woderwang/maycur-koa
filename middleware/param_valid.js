/**
 * 统一参数校验中间件
 */
'use strict';

const log = require('../common/log');

module.exports = (paramSchema) => {
    return async function(ctx, next) {
        const reqParam = {
            router: ctx.params,
            query: ctx.query,
            body: ctx.request.body,
        };
        ctx.reqParams = reqParam;
        if (!paramSchema) {
            return next();
        }
        let schemaKeys = Object.getOwnPropertyNames(paramSchema);
        if (paramSchema && schemaKeys.length > 0) {
            // 参数检查
            schemaKeys.forEach(item => {
                let validResult = paramSchema[item].validate(reqParam[item]);
                if (validResult.error) {
                    log.error('[param error]: ', validResult.error.message);
                    ctx.throw(500, new Error('参数错误'));
                }
                //使用joi校验过的合法参数，字符串数字会按照joi定义的转成数字
                reqParam[item] = validResult.value;
            });
        }
        await next();
    };
};
