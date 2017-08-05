import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.roomType)) {
    errors.roomType = 'Room Type Name is required'
  }

  if (Validator.isNull(data.room)) {
    errors.room = 'Room Type Name is required'
  }

  if (Validator.isNull(data.fullName)) {
    errors.fullName = 'Full Name is required'
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'Email is required'
  }

  if (Validator.isNull(data.contact)) {
    errors.contact = 'Contact mobile or landline is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
