import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

class TextAreaGroup extends Component {
  render () {
    const { field, value, placeholder, type, onChange, error, disabled, inputBlock } = this.props

    return (
      <div className={classnames('form-group', { 'has-error': error })}>
        {error && <small className='help-block text-right'>{error}</small>}
        <textarea
          onChange={onChange}
          value={value}
          type={type}
          name={field}
          className={classnames('form-control', { 'input-block': inputBlock })}
          disabled={disabled}
          placeholder={placeholder}
          rows='3'
        />
      </div>
    )
  }
}

TextAreaGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  inputBlock: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}

TextAreaGroup.defaultProps = {
  type: 'text'
}

export default TextAreaGroup
