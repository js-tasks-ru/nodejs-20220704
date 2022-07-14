/**
 * Readable
 * Writable
 * Duplex
 * Transform
 */

const fs = require('node:fs');

// fs.readFile('newfile.txt', (err, content) => {});

// const stream = fs.createReadStream('text.txt', {
//     highWaterMark: 7,
//     encoding: 'utf-8',
// });

// let str = '';
// stream.on('data', chunk => {
//     console.log('chunk', chunk);
//     str += chunk.toString();
// });

// stream.on('end', () => {
//     console.log('end', str);
// });

const stream = fs.createWriteStream('newfile.txt');

stream.on('close', () => {
    console.log('close');
})

setTimeout(() => {
    stream.write(1);
}, 1000);

setTimeout(() => {
    stream.write('hello wolrd');
}, 5000);

setTimeout(() => {
    stream.end();
}, 10000);