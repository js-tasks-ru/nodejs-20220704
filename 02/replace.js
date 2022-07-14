const stream = require('node:stream');

class ReplaceStream extends stream.Transform {
    constructor(options) {
        super();

        this.from = options.from;
        this.to = options.to;
    }

    _transform(chunk, _, callback) {
        callback(null, chunk.toString().replaceAll(this.from, this.to));
    }
}

module.exports = ReplaceStream;
