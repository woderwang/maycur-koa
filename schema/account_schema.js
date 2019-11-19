'use strict';

const Joi = require('@hapi/joi');

/**
 * 三种类型参数验证
 * router
 * query
 * body
 */

const fetchUserValidateSchema = {
    router: Joi.object({
        env: Joi.string().required(),
    }),
};

module.exports = {
    fetchUser: fetchUserValidateSchema,
};