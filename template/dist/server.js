const { App, Router, createStaticHandler } = require('herver'),
    { join } = require('path');

const app = new App(),
    router = new Router();

router.get(/^\//, createStaticHandler(join(__dirname, 'public')));

app.use(router.handler)
    .listen($port$);
