const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const restApi = require('./api');
const app = new Koa();

/* 允许跨域异步访问 */
app.use(cors());

/* 解析 multipart、urlencoded和json格式的请求体 */
app.use(koaBody());

app.use(restApi.routes()).use(restApi.allowedMethods());

app.listen(3000);
