let Router = require('koa-router');
let Sql = require('../controllers/sql');
let router = new Router();

router.get('/dev-account/:env', (ctx, next) => {
    return Sql.searchData({ tableName: 'dev_account', wheres: [`env="${ctx.params.env}"`] }).then(res => {
        ctx.body = res;
    }, err => {
        throw Error(err);
    })
});

/* 插入数据用的 暂时注释掉
router.post('/account-insert', (ctx, next) => {
    return Sql.insertData({ tableName: 'dev_account', values: ctx.request.body.data }).then(res => {
        ctx.body = '数据插入成功'
    }, err => {
        throw Error(err);
    })
});
*/

module.exports = router;
