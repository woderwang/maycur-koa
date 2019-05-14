const Koa = require('koa');
const cors = require('@koa/cors');
const restApi = require('./api');
const app = new Koa();

/* 允许跨域异步访问 */
app.use(cors());

app.use(restApi.routes()).use(restApi.allowedMethods());

app.listen(3000);
