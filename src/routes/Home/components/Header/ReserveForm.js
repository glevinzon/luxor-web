import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import DatePickerGroup from 'components/common/DatePickerGroup'
import validateInput from 'utils/validators/reserve'
import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap'

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
      room: ''

    }
  }

  componentWillReceiveProps (nextProps) {
    let {branchId, roomId, roomType, room} = nextProps

    this.setState({
      branchId: branchId,
      roomId: roomId,
      roomType: roomType,
      room: room
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

  render () {
    let {branch, rooms, branchId} = this.props
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <div className='flextable'>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.setState({startDate: e, endDate: e}) }}
                    value={this.state.startDate || new Date().toISOString()}
                    field='startDate'
                    placeholder='Start Date'
                    error={this.state.errors.startDate}
                  />
                </div>
                <div className='flextable-item'>
                  <DatePickerGroup
                    onChange={e => { this.setState({endDate: e}) }}
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
