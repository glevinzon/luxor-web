import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import classnames from 'classnames'
import validateInput from 'utils/validators/changePassword'

import {ModalBody,
  ModalFooter } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'

class AccountChangePasswordForm extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
    isLoading: false
  }

  componentWillReceiveProps (nextProps) {
    let { selectedEmail } = nextProps
    this.setState({email: selectedEmail})
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
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ email: '', password: '', confirmPassword: '', errors: {}, isLoading: true })
      this.props.adminChangePassword(data)
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
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
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
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
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-lg btn-pill btn-primary'>
            Change Password
          </button>
        </ModalFooter>
      </form>
    )
  }
}

AccountChangePasswordForm.propTypes = {

}

export default AccountChangePasswordForm
