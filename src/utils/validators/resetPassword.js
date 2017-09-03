import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import validator from 'email-validator'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.code)) {
    errors.code = 'Code is required'
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'Email is required'
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Password is required'
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'Password is required'
  }

  if (Validator.isNull(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required'
  }

  if (!validator.validate(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Passwords do not match'
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
