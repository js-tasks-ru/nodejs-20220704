const mongoose = require('mongoose');

async function main() {
    const schema = new mongoose.Schema({
        email: {
            type: String,
        },
        name: {
            type: String,
        },
        city: {
            type: String,
            index: true,
        },
        phone: {
            type: String, // "+7(123)1231231"
        },
        age: {
            type: Number,
        }
    });

    schema.index({name: 1, city: 1});

    const User = mongoose.model('User', schema);

    await mongoose.connect('mongodb://127.0.0.1:27017/nodejs-20220421');

    await User.create({
        email: 'user3@mail.com',
        name: 'user3',
        city: 'Kazan',
        phone: '+71231231212',
        age: 40,
    });

    const users = await User.find({age: { $gt: 18 }, city: 'Moscow'});
    
    // console.log(users);
}

main();
