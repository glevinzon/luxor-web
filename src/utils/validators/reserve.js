import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import validator from 'email-validator'

export default function validateInput (data) {
  let errors = {}

  // Check for null

  if (Validator.isNull(data.fullName)) {
    errors.fullName = 'Full Name is required'
  }

  if (!validator.validate(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (Validator.isNull(data.contact)) {
    errors.contact = 'Contact mobile or landline is required'
  }

  if (!(moment(data.startDate).isValid())) {
    errors.startDate = 'Start Date is not valid'
  }

  if (!(moment(data.endDate).isValid())) {
    errors.endDate = 'End Date is not valid'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
