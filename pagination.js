const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model('User', schema);

mongoose.connect('mongodb://localhost:27017/pagination-example');

async function main() {
    // await User.deleteMany();

    // await generateUsers(10000);

    // 1st way to paginate
    // const users1 = await User.find().sort({ _id: 1 }).skip(9000).limit(2);
    // console.log(users1);

    // 2nd way
    const users2 = await User.find({ _id: { $gt: '62a77e941b501caa4afcb4d3' } }).sort({ _id: 1 }).limit(2);
    console.log(users2);

    mongoose.disconnect();
}

async function generateUsers(n) {
    for (let i = 0; i < n; i++) {
        await User.create({ name: `user_${i}` });
    }
}

main();