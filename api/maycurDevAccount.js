let Router = require('koa-router');
let router = new Router();

let accountData = require('../constant/devAccount');

router.get('/dev-account',(ctx,next)=>{
    ctx.body = accountData;
});

module.exports = router;