const sendMail = require('./libs/sendMail');

(async function() {
  const transportResponse = await sendMail({
    to: 's.zelenov@javascript.info',
    subject: 'подтверждение регистрации',
    locals: {name: 'Сергей', url: 'http://localhost:3000/confirm/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'},
    template: 'hello',
  });

  console.log(transportResponse);
})().catch(console.error);

// uuid