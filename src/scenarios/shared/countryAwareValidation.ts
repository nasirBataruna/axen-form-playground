import { simpleValidator, type ValidationAdapter } from '@axenstudio/axen-form'

/**
 * Cross-field postal validation for playground examples with dynamic country.
 * The generic library's static rules remain unchanged in v0.1.18.
 */
const postalPatterns: Record<string, RegExp> = {
  ID: /^\d{5}$/,
  US: /^\d{5}(?:-\d{4})?$/,
  SG: /^\d{6}$/,
  JP: /^\d{3}-?\d{4}$/,
  UK: /^(?:GIR\s?0AA|(?:[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}))$/i,
}

export function countryPostalError(values: Record<string, unknown>): string | undefined {
  const country = String(values.country ?? '').trim().toUpperCase()
  const zipCode = String(values.zipCode ?? '').trim()
  if (!zipCode) return undefined // required fields remain the adapter's responsibility
  const pattern = postalPatterns[country]
  if (!pattern) return undefined // explicit rules are needed for unsupported countries
  return pattern.test(zipCode) ? undefined : 'Invalid postal code for ' + country
}

/**
 * A consumer-owned adapter: required rules + dynamic country/postal check.
 * AxenForm's validationPolicy="standard" adds email, URL and phone semantics.
 */
export const countryAwareValidationAdapter: ValidationAdapter = {
  buildSchema(fields) {
    return simpleValidator.buildSchema(fields)
  },

  async validate(schema, values) {
    const errors = await simpleValidator.validate(schema, values)
    const postalError = countryPostalError(values)
    if (postalError) errors.zipCode = postalError
    return errors
  },
}
