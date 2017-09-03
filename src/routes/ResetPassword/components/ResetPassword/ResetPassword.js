import React, { Component } from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import {Link} from 'react-router'

class ResetPassword extends Component {
  render () {
    return (
      <div className='container login-wrapper' style={{ marginTop: '15%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='https://luxoronetravellersinn.com/icon.png' width='70' /></h3>
        </div>
        <ResetPasswordForm {...this.props} />
        <div className='hr-divider'>
          <h3 className='hr-divider-content hr-divider-heading'>
            <Link to='signup'>Create Account</Link> | <Link to='/password/forgot'>Forgot Password</Link>
          </h3>
        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {

}

export default ResetPassword
