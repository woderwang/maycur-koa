'use strict';

const {accountCtrl} = require('../controller');
const {accountSchema} = require('../schema');

// 路由列表
module.exports = [
    // 获取账号信息
    {
        method: 'get',
        path: '/dev-account/:env',
        controller: accountCtrl.fetchAccount,
        paramSchema: accountSchema.fetchAccount,
    },
    {
        method: 'post',
        path: '/dev-account',
        controller: accountCtrl.addAccount,
        paramSchema: accountSchema.addAccount,
    },
    {
        method: 'put',
        path: '/dev-account/:id',
        controller: accountCtrl.updateAccount,
        paramSchema: accountSchema.updateAccount,
    },
    {
        method: 'delete',
        path: '/dev-account/:id',
        controller: accountCtrl.deleteAccount,
        paramSchema: accountSchema.deleteAccount,
    },
];
