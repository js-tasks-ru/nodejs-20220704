module.exports = function authenticate(strategy, email, displayName, done) {
  done(null, false, `функция аутентификации с помощью ${strategy} не настроена`);
};
