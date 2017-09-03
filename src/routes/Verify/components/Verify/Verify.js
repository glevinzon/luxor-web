import React, { Component } from 'react'
import {Link} from 'react-router'
import Alert from 'react-s-alert'

class Verify extends Component {

  componentDidMount () {
    let { code, email } = this.props.location.query

    this.props.verifyEmail(code, email)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.accounts.get('verifyAccountSuccess')) {
      Alert.success('Verification Success!', {
        position: 'top-right',
        effect: 'scale'
      })
    }
    if (nextProps.accounts.get('verifyAccountError')) {
      let code = nextProps.accounts.get('verifyAccountError').get('code')
      let message = nextProps.accounts.get('verifyAccountError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
  }

  render () {
    return (
      <div className='container login-wrapper' style={{ marginTop: '10%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='https://luxoronetravellersinn.com/icon.png' width='70' /></h3>
        </div>
        <p style={{ textAlign: 'center'}}>Please wait for a moment, while we verify your account. You will be will be redirected once done.</p>
        <div className='hr-divider'>
          <h3 className='hr-divider-content hr-divider-heading'>
            <Link to='verify/code'>Re-send Verification Code.</Link>
          </h3>
        </div>
      </div>
    )
  }
}

Verify.propTypes = {

}

export default Verify
