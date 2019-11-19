'use strict';

const pkg = require('../package.json');

const dateFormat = function() {
    return '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']';
};

module.exports = {
    debug: true,
    env: 'dev',
    port: 3000,
    logger: {
        dev: {
            name: 'dev',
            level: 'debug',
            json: false,
            colorize: 'all',
            localTime: true,
            label: process.pid,
            timestamp: dateFormat,
        },
        prd: {
            name: 'prd',
            level: 'info',
            json: false,
            colorize: false,
            localTime: true,
            label: process.pid,
            timestamp: dateFormat,
            datePattern: 'YYYY-MM-DD',
            filename: 'server.%DATE%.log',
            dirname: `/root/logs/${pkg.name}/`,
            maxFiles: '60d',
        },
    },
    mysql: {
        host: '',
        username: '',
        password: '',
        database: '',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },

    urlPrefix: {
        prefix: '',
    },
};
