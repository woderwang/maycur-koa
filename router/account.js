'use strict';

const {accountCtrl} = require('../controller');
const {accountSchema} = require('../schema');

// 路由列表
module.exports = [
    {
        method: 'get',
        path: '/dev-account/:env',
        controller: accountCtrl.fetchUser,
        paramSchema: accountSchema.fetchUser,
    },
];
