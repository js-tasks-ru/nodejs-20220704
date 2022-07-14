const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Session = mongoose.model('Session', schema);

module.exports = Session;