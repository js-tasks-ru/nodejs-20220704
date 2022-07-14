const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

function validateObjectID(ctx, next) {
    if (!mongoose.isValidObjectId(ctx.params.id)) {
        ctx.status = 400;
        ctx.body = 'invalid id';
        return;
    }

    return next();
}

async function handleValidationErrors(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name !== 'ValidationError') throw err;

        ctx.status = 400;
        
        ctx.body = Object.keys(err.errors).reduce((acc, key) => {
            acc[key] = err.errors[key].message;
            return acc; 
        }, {});
    }
}

const router = new Router();

router.get('/users', async (ctx, next) => {
    const users = await User.find();
    ctx.body = users;
});

router.get('/users/:id', validateObjectID, async (ctx, next) => {
    const user = await User.findById(ctx.params.id);
    if (!user) {
        ctx.status = 404;
        ctx.body = 'user not found';
    } else {
        ctx.body = user;
    }
}); 

router.put('/users/:id', validateObjectID, handleValidationErrors, async (ctx, next) => {
    const user = await User.findByIdAndUpdate(
        ctx.params.id,
        {
            email: ctx.request.body.email,
            name: ctx.request.body.name,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    ctx.body = user;
});

router.post('/users', handleValidationErrors, async (ctx, next) => {
    const user = await User.create({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
    });

    ctx.body = user;
});

app.use(router.routes());

module.exports = app;
