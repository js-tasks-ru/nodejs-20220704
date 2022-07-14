// const test = require('node:test');
const assert = require('node:assert');
const sum = require('./sum');

describe('sum test', () => {
    it('should sum 2 numbers', () => {
        assert.strictEqual(sum(1, 2), 3);
    });
});

// test('sum tests', () => {
//      assert.strictEqual(sum(1, 2), 3);
// });