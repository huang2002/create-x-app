const { App, Router, createStaticHandler, Utils } = require('herver'),
    { join } = require('path');

const app = new App(),
    router = new Router();

const HOMEPAGE_PATTERN = /^\/(?:index(?:\.html|\/)?)?$/,
    HOMEPAGE_PATH = join(__dirname, 'index.html'),
    SRC_PATTERN = /^\/__src__(\/.+)/,
    SRC_PATH = join(__dirname, '../src'),
    LIB_URL = '/__lib__.js',
    LIB_PATH = join(__dirname, '../node_modules/super-x/dist/super-x.umd.js'),
    PORT = $port$;

router.get(SRC_PATTERN, async ctx => {
    const path = ctx.store[router.storeKey][1];
    ctx.endWithFile(join(SRC_PATH, path));
});

router.get(HOMEPAGE_PATTERN, async ctx => {
    ctx.endWithFile(HOMEPAGE_PATH);
});

router.get(LIB_URL, async ctx => {
    ctx.endWithFile(LIB_PATH);
});

router.get(/^\//, createStaticHandler(join(__dirname, '../dist/public')));

app.use(Utils.requestLogger)
    .use(router.handler);

app.listen(PORT, () => {
    console.log(`the dev server is listening at port ${PORT}\n`);
});
