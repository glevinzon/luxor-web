import React, { Component } from 'react'
import SignupForm from './SignupForm'
import {Link} from 'react-router'

class Signup extends Component {
  render () {
    return (
      <div className='container login-wrapper' style={{ marginTop: '10%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='https://luxoronetravellersinn.com/icon.png' width='70' /></h3>
        </div>
        <SignupForm {...this.props} />
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><Link to='login'>Login</Link></h3>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {

}

export default Signup
