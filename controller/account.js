'use strict';

const Sequelize = require('sequelize');
const C = require('../common/constant');
const Account = require('../model/account');

const {Op} = Sequelize;

module.exports = {

    /**
     * 获取账号信息
     */
    fetchAccount: async ctx => {
        const {env} = ctx.reqParams.router;

        const data = await Account.findAll({where: {env, invalid: C.CHAR.NO}});

        ctx.body = data;
    },

    /**
     * 添加账号信息
     */
    addAccount: async ctx => {
        const {account, env, name, searchKey} = ctx.reqParams.body;

        const data = await Account.findOne({where: {account, invalid: C.CHAR.NO}});
        if (data) {
            throw new Error('账号已存在');
        }

        const list = await Account.create({account, env, name, searchKey});

        ctx.body = list;
    },

    /**
     * 修改账号信息
     */
    updateAccount: async ctx => {
        const {id} = ctx.reqParams.router;
        const {account, env, name, searchKey} = ctx.reqParams.body;

        const data = await Account.findOne({where: {account, invalid: C.CHAR.NO, id: {[Op.ne]: id}}});
        if (data) {
            throw new Error('账号已存在');
        }
        await Account.update({account, env, name, searchKey}, {where: {id, invalid: C.CHAR.NO}});

        ctx.body = 'SUCCESS';
    },

    /**
     * 删除账号信息（软删除）
     */
    deleteAccount: async ctx => {
        const {id} = ctx.reqParams.router;

        const data = await Account.update({invalid: C.CHAR.YES}, {where: {id, invalid: C.CHAR.NO}});
        if (data <= 0) {
            throw new Error('删除失败');
        }
        ctx.body = 'SUCCESS';
    },
};
