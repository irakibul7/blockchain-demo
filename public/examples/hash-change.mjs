// Offline classroom example. No network calls or payments.
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const block = {
  index: 1, timestamp: '2026-08-26T10:01:15.000Z',
  data: 'Payment of 25 to Alice',
  previousHash: '000d15874e8c9c7ef4d1fc3d005f4fd88b8f9d5ae86dd4e98a4753c0bcdf5c2a',
  nonce: 1772,
};
function hash(b) {
  return createHash('sha256').update(
    [b.index, b.timestamp, b.data, b.previousHash, b.nonce].join('|')
  ).digest('hex');
}
const original = hash(block);
const edited = hash({ ...block, data: 'Payment of 250 to Alice' });
assert.equal(original, '000e0e0873804d95b512b7f381fda2b2e0b5ef21f85a7c63783cea954f5c9936');
assert.notEqual(original, edited);
assert.equal(hash({ ...block }), original);
console.log('original:', original);
console.log('edited:  ', edited);
console.log('restored:', hash(block));
