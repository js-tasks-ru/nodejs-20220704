const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) {
    return done(null, false, 'Не указан email');
  }

  try {
    let user = await User.findOne({ $or: [ { 'providers.email': email }, { email } ] });

    if (user) {
      return done(null, user);
    }

    user = await User.create({
      email, displayName,
      providers: [{
        name: strategy,
        email: email,
      }]
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
};
