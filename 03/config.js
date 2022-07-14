const path = require('path');

module.exports = {
    resultsFolderPath: process.env.NODE_ENV === 'test'
        ? path.join(__dirname, '/test-results')
        : path.join(__dirname, '/results'),
}