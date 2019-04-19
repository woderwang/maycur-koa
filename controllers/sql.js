const formatSql = ({ tabelName, selects = [], wheres = [] }) => {
    if (!tabelName || !Array.isArray(selects) || !Array.isArray(wheres)) return;
    const selectsText = selects.join(',') || '*';
    const wheresText = wheres.length ? `WHERE ${wheres.join(' AND ')}` : '';
    return `SELECT ${selectsText} FROM ${tabelName} ${wheresText};`;
}

/**
 * 
 * @param {Object} options 
 * options.tabelName 查询的表name
 * options.selects {Array} 查询字段 不填默认为查询所有字段
 * options.wheres  {Array} 查询条件
 * @param {String} sqlText 复杂查询直接传入 sql语句查询
 */
const searchData = (options = {}, sqlText) => {
    return new Promise((reslove, reject) => {
        const query = sqlText || formatSql(options);
        if (!query) reject('options 配置有误')
        else {
            const mysql = require('mysql');
            const config = require('../mysql.config');
            const connection = mysql.createConnection(config);
            connection.connect();
            connection.query(query, (error, results, fields) => {
                if (error) reject(error);
                else reslove(results);
            });
            connection.end();
        }
    });
}

module.exports = {
    searchData
}
