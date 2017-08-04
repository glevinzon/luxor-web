import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import DatePickerGroup from 'components/common/DatePickerGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/reserve'
import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'

class ReserveForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      branchId: '',
      roomId: '',
      fullName: '',
      note: '',
      email: '',
      address: '',
      contact: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      errors: [],
      isLoading: false,
      isOpen: false
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
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ fullName: '', email: '',
        contact: '', address: '',
        date: new Date().toISOString(),
        note: '', errors: {}, isLoading: true })
      this.props.createReservation(data)
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.fullName}
                field='fullName'
                placeholder='Full Name'
                error={this.state.errors.fullName}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
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
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.contact}
                field='contact'
                placeholder='Contact Mobile or Landline'
                error={this.state.errors.contact}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.address}
                field='address'
                placeholder='Address'
                error={this.state.errors.address}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <div className='flextable'>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.setState({startDate: e}) }}
                    value={this.state.startDate}
                    field='startDate'
                    placeholder='Start Date'
                    error={this.state.errors.startDate}
                  />
                </div>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.setState({endDate: e}) }}
                    value={this.state.endDate}
                    field='endDate'
                    placeholder='End Date'
                    minDate={this.state.startDate}
                    error={this.state.errors.endDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.note}
                field='note'
                placeholder='Note'
                error={this.state.errors.note}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'>
            Submit
          </button>
        </ModalFooter>
      </form>
    )
  }
}

ReserveForm.propTypes = {

}

export default ReserveForm
