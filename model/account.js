'use strict';

const moment = require('moment');
const Sequelize = require('sequelize');
const {Model} = Sequelize;

const mysql = require('../common/mysql');

class Account extends Model {}

Account.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    account: {
        type: Sequelize.STRING,
    },
    env: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    searchKey: {
        type: Sequelize.STRING,
    },
    ctime: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    mtime: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('ctime')).format('YYYY-MM-DD HH:mm:ss');
        },
    },
    invalid: {
        type: Sequelize.STRING,
    },
}, {
    sequelize: mysql,
    modelName: 'accounts',
    timestamps: false,
});

module.exports = Account;