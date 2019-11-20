'use strict';

const Joi = require('@hapi/joi');

/**
 * 三种类型参数验证
 * router
 * query
 * body
 */

const fetchAccountValidateSchema = {
    router: Joi.object({
        env: Joi.string().required(),
    }),
};

const addAccountValidateSchema = {
    body: Joi.object({
        account: Joi.string().required(),
        env: Joi.string().required(),
        name: Joi.string().required(),
        searchKey: Joi.string().required(),
    }),
};

const updateAccountValidateSchema = {
    router: Joi.object({
        id: Joi.number().required(),
    }),
    body: Joi.object({
        account: Joi.string().required(),
        env: Joi.string().required(),
        name: Joi.string().required(),
        searchKey: Joi.string().required(),
    }),
};

const deleteAccountValidateSchema = {
    router: Joi.object({
        id: Joi.number().required(),
    }),
};

module.exports = {
    fetchAccount: fetchAccountValidateSchema,
    addAccount: addAccountValidateSchema,
    updateAccount: updateAccountValidateSchema,
    deleteAccount: deleteAccountValidateSchema,
};