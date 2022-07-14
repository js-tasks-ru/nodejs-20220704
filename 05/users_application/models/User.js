const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: 'email - обязательное поле',
    unique: 'такой email уже есть',
    validate: [{
      validator: value => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'email некорректный',
    }]
  },
  name: {
    type: String,
  },
});

module.exports = connection.model('User', schema);
