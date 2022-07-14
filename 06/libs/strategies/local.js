const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
  {usernameField: 'email', session: false},
  async function(email, password, done) {
    // done(err) -> no db connection
    // done(null, user) -> success
    // done(null, null, "wrong password") -> failed

    console.log(email, password);

    /**
     * 1. find user by email
     * 2. generate hash using password
     * 3. compare hash
     */

    return done(null, null, 'стратегия еще не настроена');
  }
);
