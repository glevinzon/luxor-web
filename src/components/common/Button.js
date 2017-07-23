import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Loading from './Loading'

class Button extends Component {
  render () {
    const { value, className, hidden, disabled } = this.props

    return (
      <center>
        <button
          value={value}
          hidden={hidden}
          disabled={disabled}
          className={classnames('btn', className)}
        >
          {value}
        </button>
        <Loading hidden={!hidden} />
      </center>
    )
  }
}

Button.propTypes = {
}

export default Button
