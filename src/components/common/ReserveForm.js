import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import DatePickerGroup from 'components/common/DatePickerGroup'
import TextAreaGroup from 'components/common/TextAreaGroup'
import validateInput from 'utils/validators/reserve'
import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment'

const InputGroupButton = InputGroup.Button

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
      startDate: null,
      endDate: null,
      errors: [],
      isLoading: false,
      isOpen: false,
      roomType: '',
      room: '',
      reserved: null,
      available: null
    }
  }

  componentWillReceiveProps (nextProps) {
    let {branchId, roomId, roomType, room, reserved, available, errors} = nextProps

    this.setState({
      branchId: branchId,
      roomId: roomId,
      roomType: roomType,
      room: room,
      reserved: reserved,
      available: available,
      errors: errors
    })
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
      this.setState({
        branchId: '',
        reserved: null,
        roomId: '',
        roomType: '',
        room: '',
        fullName: '',
        email: '',
        contact: '',
        address: '',
        startDate: null,
        endDate: null,
        note: '', errors: {}, isLoading: true })
      this.props.createReservation(data)
    }
  }

  handleCheckAvailability = (e) => {
    this.setState({endDate: e})
    let data = this.state
    data.endDate = e
    this.props.checkAvailability(data)
  }

  render () {
    let {branch, rooms, branchId} = this.props
    let {reserved} = this.state
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
      {this.state.available}
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <div className='flextable'>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.setState({reserved: null, startDate: e, endDate: e}) }}
                    value={this.state.startDate || new Date().toISOString()}
                    field='startDate'
                    placeholder='Start Date'
                    error={this.state.errors.startDate}
                  />
                </div>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.handleCheckAvailability(e) }}
                    value={this.state.endDate || new Date().toISOString()}
                    field='endDate'
                    placeholder='End Date'
                    disabled={this.state.startDate == null}
                    minDate={this.state.startDate}
                    error={this.state.errors.endDate}
                  />
                </div>
              </div>
            </div>
          </div>
          {!this.state.roomType && (
            <div className='form-group row'>
              <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.roomType}
                  field='roomType'
                  placeholder='Room Type'
                  disabled
                  error={this.state.errors.roomType}
                  />
                  <DropdownButton
                    componentClass={InputGroupButton}
                    id='input-dropdown-addon'
                    title='Room Types'
                  >
                    {!!(branch && branchId) && JSON.parse(branch.get('roomTypes')).map((type, key) => {
                      return (<MenuItem key={key} onClick={e => { this.setState({roomType: type.name, branchId: branchId, room: ''}) }}>{type.name}</MenuItem>)
                    })}
                  </DropdownButton>
              </div>
            </div>
          )}
          {!this.state.room && (
            <div className='form-group row'>
              <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.room}
                  field='room'
                  disabled
                  placeholder='Select Room'
                  error={this.state.errors.room}
                  />
                  <DropdownButton
                    componentClass={InputGroupButton}
                    id='input-dropdown-addon'
                    title='Room Names'
                    disabled={this.state.roomType == ''}
                  >
                  {rooms && rooms.map((room, key) => {
                    if (this.state.roomType === room.get('type')) {
                      return (<MenuItem key={key} onClick={e => { this.setState({room: room.get('name'), roomId: room.get('id')}) }}>{room.get('name')}</MenuItem>)
                    }
                  })}

                  </DropdownButton>
              </div>
            </div>
          )}
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
              <TextAreaGroup
                onChange={this.onChange}
                value={this.state.note}
                field='note'
                placeholder='Note'
                error={this.state.errors.note}
              />
            </div>
          </div>
          <div className='hr-divider'>
            <h3 className='hr-divider-content hr-divider-heading'>
              Approved Reservations
            </h3>
          </div>
          <div className='table-full' style={{textAlign: 'left'}}>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reserved && reserved.map(reserve => {
                    return (
                      <tr key={reserve.id}>
                        <td>{reserve.code}</td>
                        <td>{moment.utc(reserve.startDate).format('dddd, MM/DD/YY')}</td>
                        <td>{moment.utc(reserve.endDate).format('dddd, MM/DD/YY')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button disabled={reserved == null || (reserved && reserved.length > 0)} className='btn btn-primary'>
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
