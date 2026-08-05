import assert from 'assert';
import { normalizeCourierValue } from './paymentController.js';

const cases = [
  { input: { courier: 'BlueDart' }, expected: 'BlueDart' },
  { input: { courier: { partner: 'DTDC' } }, expected: 'DTDC' },
  { input: { courier: { name: 'FedEx' } }, expected: 'FedEx' },
  { input: {}, expected: 'Not Assigned' },
];

for (const testCase of cases) {
  const result = normalizeCourierValue(testCase.input);
  assert.strictEqual(result, testCase.expected, `Expected ${testCase.expected} but received ${result}`);
}
