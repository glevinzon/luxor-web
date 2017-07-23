import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.email)) {
    errors.email = 'Username is required'
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
