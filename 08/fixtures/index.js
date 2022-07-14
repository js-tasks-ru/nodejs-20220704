const User = require('../models/User');
const connection = require('../libs/connection');

const users = [
  {
    email: 'user1@mail.com',
    password: '123123',
    displayName: 'user1',
  },
  {
    email: 'user2@mail.com',
    password: '123123',
    displayName: 'user2',
  }
];

(async () => {
  await User.deleteMany();
  
  for (const user of users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }
  
  connection.close();
  console.log(`All done, ${users.length} users have been saved in DB`);
})();
