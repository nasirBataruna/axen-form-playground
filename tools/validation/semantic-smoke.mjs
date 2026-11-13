import assert from 'node:assert/strict'
import { createFormStore, simpleValidator, withValidationPolicy } from '@axenstudio/axen-form'

// Assertions use the installed npm package, not the axen-lib source tree.
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
assert.deepEqual(await validator.validate(schema, {
  email: 'john@example.com', phone: '081234567890', zipCode: '57111', termsAccepted: true,
}), {})

// New in 0.1.19: native countryField, custom countries, unsupported-country policy.
const countryFields = [
  { name: 'country', type: 'select', required: true },
  { name: 'zipCode', type: 'text', required: true,
    rules: { format: 'postalCode', countryField: 'country' } },
]
const countryValidator = withValidationPolicy(simpleValidator, {
  mode: 'standard',
  unknownCountry: 'ignore', // Playground's "OTHER" selection has no fixed ZIP rule.
  postalCodePatterns: { DE: /^\d{5}$/ },
})
const countrySchema = countryValidator.buildSchema(countryFields)
for (const [country, zipCode] of [
  ['ID', '57111'], ['US', '94105'], ['SG', '238801'],
  ['JP', '100-0001'], ['UK', 'SW1A 1AA'], ['DE', '10115'],
  ['OTHER', 'any local format'],
]) {
  assert.deepEqual(await countryValidator.validate(countrySchema, { country, zipCode }), {},
    'Rejected valid postal code for ' + country)
}
for (const [country, zipCode] of [
  ['ID', '1234'], ['US', 'wrong'], ['SG', '123'],
  ['JP', 'abc'], ['UK', 'abc'], ['DE', '123'],
]) {
  const errors = await countryValidator.validate(countrySchema, { country, zipCode })
  assert.ok(errors.zipCode, 'Country-specific ZIP accepted invalid input for ' + country)
}

// New in 0.1.19: validation lifecycle is not equivalent to an empty errors map.
const store = createFormStore({
  initialValues: { country: 'ID', zipCode: '57111' },
  fields: countryFields,
  validationAdapter: countryValidator,
  validateOnChange: false,
})
assert.equal(store.getState().validationStatus, 'unvalidated')
const first = store.validateForm()
assert.equal(store.getState().validationStatus, 'validating')
await first
assert.equal(store.getState().validationStatus, 'valid')
assert.equal(store.getState().fieldValidationStatus.zipCode, 'valid')
store.setFieldValue('country', 'SG')
assert.equal(store.getState().validationStatus, 'unvalidated')
await store.validateForm()
assert.equal(store.getState().validationStatus, 'invalid')
assert.ok(store.getState().errors.zipCode)
store.setFieldValue('zipCode', '238801')
await store.validateForm()
assert.equal(store.getState().validationStatus, 'valid')
store.resetForm()
assert.equal(store.getState().validationStatus, 'unvalidated')
console.log('Published @axenstudio/axen-form v0.1.19 native validation and lifecycle smoke PASS')
