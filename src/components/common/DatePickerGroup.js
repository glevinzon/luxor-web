import React, { Component, PropTypes } from 'react'
import DatePicker from 'react-bootstrap-date-picker'
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap'

class DatePickerGroup extends Component {
  render () {
    const { field, value, placeholder, onChange, error, disabled } = this.props

    return (
      <FormGroup>
        <DatePicker id='reservation-datepicker' name={field} value={value} disabled={disabled} placeholder={placeholder} onChange={onChange} />
      </FormGroup>
    )
  }
}

DatePickerGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}

export default DatePickerGroup
