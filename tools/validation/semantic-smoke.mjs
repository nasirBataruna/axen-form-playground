import assert from 'node:assert/strict'
import { simpleValidator, withValidationPolicy } from '@axenstudio/axen-form'
import { countryPostalError } from '../../src/scenarios/shared/countryAwareValidation.ts'

// Test the published package, not the axen-lib source/worktree.
const fields = [
  { name: 'email', type: 'email', required: true },
  { name: 'phone', type: 'tel', rules: { format: 'phone', region: 'ID' } },
  { name: 'zipCode', type: 'text', rules: { format: 'postalCode', country: 'ID' } },
  { name: 'termsAccepted', type: 'checkbox', required: true },
]
const validator = withValidationPolicy(simpleValidator, { mode: 'standard' })
const schema = validator.buildSchema(fields)
const invalid = await validator.validate(schema, {
  email: 'sdasd', phone: '123', zipCode: 'abc', termsAccepted: false,
})
for (const key of ['email', 'phone', 'zipCode', 'termsAccepted']) {
  assert.ok(invalid[key], 'Missing invalid-field error: ' + key)
}
const valid = await validator.validate(schema, {
  email: 'john@example.com', phone: '081234567890', zipCode: '57111', termsAccepted: true,
})
assert.deepEqual(valid, {})

assert.equal(countryPostalError({ country: 'ID', zipCode: '1234' }), 'Invalid postal code for ID')
assert.equal(countryPostalError({ country: 'ID', zipCode: '57111' }), undefined)
assert.equal(countryPostalError({ country: 'US', zipCode: '94105' }), undefined)
assert.equal(countryPostalError({ country: 'US', zipCode: 'wrong' }), 'Invalid postal code for US')
assert.equal(countryPostalError({ country: 'SG', zipCode: '238801' }), undefined)
assert.equal(countryPostalError({ country: 'JP', zipCode: '100-0001' }), undefined)
assert.equal(countryPostalError({ country: 'UK', zipCode: 'SW1A 1AA' }), undefined)
assert.equal(countryPostalError({ country: 'OTHER', zipCode: 'custom' }), undefined)

console.log('Published @axenstudio/axen-form v0.1.18 semantic validation smoke PASS')
