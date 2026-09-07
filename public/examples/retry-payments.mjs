// Offline, single-process teaching model. NOT a payment service.
// Map/Set state is lost on restart. No network, signing, or funds.
import assert from 'node:assert/strict';
const intents = new Map();
const fakeLedger = new Set();
let loseFirstResponse = true;

function reserve(operationId, payment) {
  // Fixed field order; integer amount as a string, never floating point.
  const payload = JSON.stringify([
    payment.network, payment.asset, payment.to, payment.amount,
  ]);
  const existing = intents.get(operationId);
  if (existing) {
    if (existing.payload !== payload) throw new Error('conflicting retry');
    return existing;
  }
  // No await between lookup and insertion: atomic only in this toy process.
  // Production: durable unique constraint + authorized business operation.
  const intent = {
    id: `classroom-${intents.size + 1}`, payload, state: 'prepared',
  };
  intents.set(operationId, intent);
  return intent;
}

async function requestPayment(operationId, payment) {
  const intent = reserve(operationId, payment);
  // Reconcile first. This fake lookup is definitive; real node views aren't.
  if (fakeLedger.has(intent.id)) {
    intent.state = 'observed'; // NOT confirmed or finalized
    return intent;
  }
  fakeLedger.add(intent.id); // fake delivery of the SAME prepared intent
  if (loseFirstResponse) {
    loseFirstResponse = false;
    intent.state = 'unknown';
    throw new Error('response lost after simulated delivery');
  }
  intent.state = 'observed';
  return intent;
}

const payment = {
  network: 'classroom', asset: 'pretend-units', to: 'Alice', amount: '25',
};
const operation = 'order-1024-refund-1';
await assert.rejects(requestPayment(operation, payment), /response lost/);
assert.equal(intents.get(operation).state, 'unknown');
const [a, b] = await Promise.all([
  requestPayment(operation, payment), requestPayment(operation, payment),
]);
assert.equal(a.id, b.id);
assert.equal(a.state, 'observed');
assert.equal(fakeLedger.size, 1);
await assert.rejects(
  requestPayment(operation, { ...payment, amount: '250' }), /conflicting retry/
);
console.log('simulated effects:', fakeLedger.size);
console.log('same intent on concurrent retries:', a.id === b.id);
console.log('conflicting retry: rejected');
