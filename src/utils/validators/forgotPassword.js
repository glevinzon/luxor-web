import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

import validator from 'email-validator'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.email)) {
    errors.email = 'Email is required'
  }

  if (!validator.validate(data.email)) {
    errors.email = 'Email is invalid.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
