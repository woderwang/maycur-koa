'use strict';

const Sequelize = require('sequelize');

const {mysql: {database, username, password, host, pool}} = require('../config');
const log = require('./log');

const mysqlServer = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    pool,
    timezone: '+08:00',
    logging: (...values) => log.debug(...values),
});

// 测试连接
mysqlServer
    .authenticate()
    .then(() => {
        log.info(`Mysql(${host}) Connection has been established successfully.`);
    })
    .catch(err => {
        log.error('Unable to connect to the database:', err);
    });


module.exports = mysqlServer;