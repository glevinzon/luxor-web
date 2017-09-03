import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/signup'
import Alert from 'react-s-alert'

class SignupForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      isLoading: false
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (!newProps.account.get('creatingAccountSuccess')) {
      this.setState({ isLoading: false })
    }
    if (newProps.account.get('createAccountError')) {
      let code = newProps.account.get('createAccountError').get('code')
      let message = newProps.account.get('createAccountError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
    if (newProps.account.get('creatingAccountSuccess')) {
      let user = newProps.account.get('account')
      Alert.success(`Registration Success! Email sent to ${user.get('email')} for verification.`, {
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
      var data = this.state
      this.props.createAccount(data)
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.username}
              field='username'
              placeholder='Username'
              error={this.state.errors.username}
              />
          </div>
        </div>
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
              value='Register'
              hidden={this.state.isLoading}
              className='btn btn-default-outline'
            />
          </div>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {

}

export default SignupForm
