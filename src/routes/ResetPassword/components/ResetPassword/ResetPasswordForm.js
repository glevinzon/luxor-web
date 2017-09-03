import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/resetPassword'
import Alert from 'react-s-alert'

class ResetPasswordForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      isLoading: false
    }
  }

  componentWillMount () {
    let { code, email } = this.props.location.query

    if ((code && email) && (code != undefined && email != undefined)) {
      this.setState({
        code: code,
        email: email
      })
    } else {
      Alert.error('<h4>Error: Code and/or Email not found.</h4><ul>' + '<li>Please re-send email.</li>' + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.accounts.get('changePasswordError')) {
      let code = newProps.accounts.get('changePasswordError').get('code')
      let message = newProps.accounts.get('changePasswordError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
    if (newProps.accounts.get('changePasswordSuccess')) {
      Alert.success('Success! Password Changed!', {
        position: 'top-right',
        effect: 'scale'
      })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      const data = this.state
      this.props.changePassword(data)
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.email}
              field='email'
              placeholder='Email'
              error={this.state.errors.email}
              />
          </div>
        </div>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <TextFieldGroup
              type='password'
              onChange={this.onChange}
              value={this.state.password}
              field='password'
              placeholder='Password'
              error={this.state.errors.password}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <TextFieldGroup
              type='password'
              onChange={this.onChange}
              value={this.state.confirmPassword}
              field='confirmPassword'
              placeholder='Confirm Password'
              error={this.state.errors.confirmPassword}
            />
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <Button
              value='Change Password'
              hidden={this.state.isLoading}
              className='btn btn-default-outline'
            />
          </div>
        </div>
      </form>
    )
  }
}

ResetPasswordForm.propTypes = {

}

export default ResetPasswordForm
