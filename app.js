const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const controller = require('./controller');
const cors = require('@koa/cors');
const loginRouter =  require('./router/login');
const restApi = require('./api');
const app = new Koa();
/* 允许跨域异步访问 */
app.use(cors());
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next();
});

app.use(bodyParser());
// app.use(controller());
app.use(loginRouter.routes());
app.use(restApi.routes()).use(restApi.allowedMethods());

app.listen(3000);
console.log('app started at port 3000...');
