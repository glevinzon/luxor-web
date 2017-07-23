import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

class TextFieldGroup extends Component {
  render () {
    const { field, value, placeholder, type, onChange, error, disabled } = this.props

    return (
      <div className={classnames('form-group', { 'has-error': error })}>
        {error && <small className='help-block text-right'>{error}</small>}
        <input
          onChange={onChange}
          value={value}
          type={type}
          name={field}
          className='form-control'
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    )
  }
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup