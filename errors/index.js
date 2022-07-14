const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log('error');
    if (error.status) {
      ctx.status = error.status;
      ctx.message = error.message;
    } else {
      ctx.status = 500;
      ctx.body = 'internal server error';
    }
  }
});

router.get('/', async (ctx, next) => {
  // throw | ctx.throw();
  ctx.throw(401, 'need auth');
  /**
   * 
   * class UserError extends Error {
   *   contstructor(status, message) {
   *      super(message);
   *      this.status = status;
   *   }
   * }
   * 
   * ctx.throw = function(status, message) {
   *    throw new UserError(status, message);
   * }
   * 
   */
  const obj = await getStr();
  ctx.body = obj.counter + 1;
});

app.use(router.routes());

app.listen(8080);

function getStr() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const str = '{"counter: 0}';
        const obj = JSON.parse(str);
        resolve(obj);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}
