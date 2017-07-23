import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/login'
import Alert from 'react-s-alert'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: [],
      isLoading: false
    }
  }

  componentWillMount () {
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (!newProps.auth.get('loggingIn')) {
      this.setState({ isLoading: false })
    }
    if (newProps.auth.get('loginError')) {
      let code = newProps.auth.get('loginError').get('code')
      let message = newProps.auth.get('loginError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
    if (newProps.auth.get('loginSuccess')) {
      let user = newProps.auth.get('user')
      Alert.success(`Welcome! ${user.get('username')}`, {
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
      const { email, password } = this.state
      this.props.login(email, password)
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
          <div className='col-sm-offset-4 col-xs-offset-2'>
            <Button
              value='Log In'
              hidden={this.state.isLoading}
              className='btn btn-default-outline'
            />
          </div>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {

}

export default LoginForm
