const mysql = require('mysql');
const CONFIG = require('../mysql.config');

const _isArray = Array.isArray;

const formatSql = ({ tableName, selects = [], wheres = [] }) => {
    if (!tableName || !_isArray(selects) || !_isArray(wheres)) return;
    const selectsText = selects.join(',') || '*';
    const wheresText = wheres.length ? `WHERE ${wheres.join(' AND ')}` : '';
    return `SELECT ${selectsText} FROM ${tableName} ${wheresText}`;
}

/* 链接数据库操作通用方法 */
const connectMySql = (sql) => {
    console.log(sql)
    const pool = mysql.createPool(CONFIG);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(err);
            conn.query(sql, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
                conn.release();
            })
        });
    })
}

/**
 * 查询数据方法
 * @param {Object} options 
 * options.tableName 查询的表name
 * options.selects {Array} 查询字段 不填默认为查询所有字段
 * options.wheres  {Array} 查询条件
 * @param {String} sqlText 复杂查询直接传入 sql语句查询
 */
const searchData = (options = {}, sqlText) => {
    return new Promise((resolve, reject) => {
        const query = sqlText || formatSql(options);
        if (!query) reject('options 配置有误')
        else {
            connectMySql(query).then(res => {
                resolve(res);
            }, err => {
                console.log('connect err')
                reject(err);
            });
        }
    });
}

/**
 * 插入数据方法
 * @param {String} tableName 插入数据的表name
 * @values {Object, Array} 插入单条数据传入 {key: value,...} 多条数据传入 数组
 */
const insertData = ({ tableName, values = {} }) => {
    return new Promise((resolve, reject) => {
        if (!tableName) return reject('tableName 为必填参数');
        let keys = [], valuesText = '';
        if (_isArray(values)) {
            if (values.length) keys = Object.keys(values[0]);
            valuesText = values.map(item => `(${keys.map(key => `"${item[key]}"`).join(',')})`);
        }
        else {
            keys = Object.keys(values);
            valuesText = `(${Object.values(values).map(val => `"${val}"`).join(',')})`;
        }
        if (!keys.length) return reject('values 为必填参数');
        const sqlText = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES${valuesText}`;
        connectMySql(sqlText).then(res => {
            resolve(res);
        }, err => {
            reject(err);
        });
    });
}

// 暂时不写
const updateData = (options = {}) => {

}

module.exports = {
    searchData,
    insertData,
    updateData
}
