import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/login'

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
    console.log('PROPS', this.props)
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (!newProps.loggingIn) {
      this.setState({ isLoading: false })
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
              className='green btn-block'
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
