'use strict';

const _ = require('lodash');
let config = require('./config_default');

// 开发人员可配置的环境
try {
    let envConfig = require('./config');
    config = _.merge(config, envConfig);
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        log.error('[ERROR] loading config/config.js failed:', e.message); // eslint-disable-line
    }
}

module.exports = config;
