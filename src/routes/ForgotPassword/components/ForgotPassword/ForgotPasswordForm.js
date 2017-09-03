import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/forgotPassword'
import Alert from 'react-s-alert'

class ForgotPasswordForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errors: [],
      isLoading: false
    }
  }

  componentWillMount () {
  }

  componentWillReceiveProps (newProps, oldProps) {
    if (newProps.accounts.get('forgotPasswordError')) {
      let code = newProps.accounts.get('forgotPasswordError').get('code')
      let message = newProps.accounts.get('forgotPasswordError').get('message')
      Alert.error(`<h4>Error ${code}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    }
    if (newProps.accounts.get('forgotPasswordSuccess')) {
      Alert.success('Success! Please check your email.', {
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
      this.props.forgotPassword(data)
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
          <div className='col-sm-offset-4 col-sm-4 col-xs-offset-2 col-xs-8'>
            <Button
              value='Reset Password'
              hidden={this.state.isLoading}
              className='btn btn-default-outline'
            />
          </div>
        </div>
      </form>
    )
  }
}

ForgotPasswordForm.propTypes = {

}

export default ForgotPasswordForm
