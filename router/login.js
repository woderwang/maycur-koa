let Router = require('koa-router');
var router = new Router();
router.get('/',async (ctx,next)=>{
    ctx.body = 'Hello World!';
});
router.get('/login',async (ctx,next)=>{
    ctx.body = 'login page';
});
module.exports = router;