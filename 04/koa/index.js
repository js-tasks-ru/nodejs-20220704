const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');
const fs = require('fs');

const app = new Koa();

app.use(bodyParser());
app.use(static('public'));

app.use(async (ctx, next) => {
    const now = Date.now();

    await next();

    const diff = Date.now() - now;

    console.log('request has been processed', diff, 'ms');
});


const profileRouter = new Router({ prefix: '/profile' });

profileRouter.get('/:profileName', async (ctx, next) => {
    // ctx.params.profileName - 'sergey-zelenov'
    ctx.body = ctx.params.profileName;
});

profileRouter.post('/photo', async (ctx, next) => {
    
});

profileRouter.delete('/:profileName', async (ctx, next) => {

});

app.use(profileRouter.routes()); // profileRouter.routes() => (ctx, next) => {}

app.listen(3000);

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}