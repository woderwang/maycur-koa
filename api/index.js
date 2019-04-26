let Router = require('koa-router');
let router = new Router();
let devAccount = require('./maycurDevAccount');

router.use('/api', devAccount.routes(), devAccount.allowedMethods());

module.exports = router;
