const fs = require('fs');

function addMapping() {}

function addControllers(router, dir) {
  var files = fs.readdirSync(dir);
  var js_files = files.filter(f => f.endsWith('.js'));

  for(var f of js_files) {
    console.log();
  }
}

module.exports = function(dir) {
  let controllers_dir = dir || 'controllers',
     router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};
