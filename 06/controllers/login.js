const passport = require('../libs/passport');
const User = require('../models/User');
const Session = require('../models/Session');
const config = require('../config');

const jwt = require('jsonwebtoken');


module.exports.login = async function login(ctx, next) {
  
  await passport.authenticate('local', async (err, user, info) => {
    
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info }; // 'стратегия еще не подключена'
      return;
    }
    
    const token = jwt.sign({
      id: user.id, 
      name: user.displayName,
    }, 'killer-is-jim');

    ctx.body = token;

  })(ctx, next);

};