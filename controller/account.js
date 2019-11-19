'use strict';

const C = require('../common/constant');
const Account = require('../model/account');

module.exports = {
    /**
     * 获取用户信息
     */
    fetchUser: async ctx => {
        const {env} = ctx.reqParams.router;

        const data = await Account.findAll({where: {env, invalid: C.CHAR.NO}});

        ctx.body = data;
    },
};
