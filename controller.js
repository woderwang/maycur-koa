const fs = require('fs');

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            const path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    const files = fs.readdirSync(`${__dirname}/${dir}`);
    const js_files = files.filter(f => f.endsWith('.js'));
    debugger
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(`${__dirname}/${dir}/${f}`);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();

    addControllers(router, controllers_dir);
    return router.routes();
};
