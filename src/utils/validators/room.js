import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.branchId)) {
    errors.branchId = 'Branch is required'
  }

  if (Validator.isNull(data.name)) {
    errors.name = 'Name is required'
  }

  if (Validator.isNull(data.type)) {
    errors.type = 'Type of the room is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
