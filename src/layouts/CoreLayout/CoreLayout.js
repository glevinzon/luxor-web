import React from 'react'
import '../../styles/core.scss'

import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

export const CoreLayout = ({ children }) => (
  <div className='site-wrapper'>
    {children}
    <Alert stack={{limit: 3}} />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
