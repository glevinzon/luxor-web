import React, { Component } from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import {Link} from 'react-router'

class ForgotPassword extends Component {
  render () {
    return (
      <div className='container login-wrapper' style={{ marginTop: '15%' }}>
      <div className='hr-divider m-t m-b'>
        <h3 className='hr-divider-content hr-divider-heading'><img src='https://luxoronetravellersinn.com/icon.png' width='70' /></h3>
      </div>
      <ForgotPasswordForm {...this.props} />
      <div className='hr-divider'>
      <h3 className='hr-divider-content hr-divider-heading'>
        <Link to='/login'>Login</Link> | <Link to='/signup'>Create Account</Link>
      </h3>
    </div>
    </div>
    )
  }
}

ForgotPassword.propTypes = {

}

export default ForgotPassword
