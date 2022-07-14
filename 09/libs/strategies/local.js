const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

const errorMessage = 'Нет такого пользователя или пароль неверен';

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    async function(email, password, done) {
      try {
        let user = await User.findOne({email});
        if (!user) {
          user = new User();
          await user.setPassword('alksdjfalsdkjf');
          
          return done(null, false, errorMessage);
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
          return done(null, false, errorMessage);
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
);
