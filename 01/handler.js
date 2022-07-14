let i = 0;

// const obj = {};

function handler(req, res) {
    i++;

    // obj[i] = '*'.repeat(100000).split('');

    res.end(i.toString());
}

// commonjs

module.exports = handler;