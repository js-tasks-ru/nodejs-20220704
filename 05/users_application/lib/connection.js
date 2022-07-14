const mongoose = require('mongoose');
const mongooseUniquePlugin = require('mongoose-beautiful-unique-validation');

mongoose.plugin(mongooseUniquePlugin);

module.exports = mongoose.createConnection('mongodb://localhost:27017/nodejs-20220421-application');
