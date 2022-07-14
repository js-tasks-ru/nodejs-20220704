const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('../config');

mongoose.plugin(beautifyUnique);

module.exports = mongoose.createConnection(config.mongodb.uri);
