import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/branch'
import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import Map from 'components/common/Map'

class BranchCreateForm extends Component {
  state = {
    name: '',
    address: '',
    coordinates: '',
    contact: '',
    roomTypes: null,
    roomType: null,
    errors: [],
    isLoading: false
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
      console.log('wew', data.roomTypes)
      data.coordinates = JSON.stringify(data.coordinates)
      data.roomTypes = JSON.stringify(data.roomTypes)
      this.setState({ name: '',
        contact: '', address: '',
        coordinates: '',
        roomTypes: null, roomType: '', errors: {}, isLoading: true })
      this.props.createBranch(data)
    }
  }

  handleAddRoomType = () => {
    let {roomType, roomTypes} = this.state
    let types = roomTypes || []
    if (roomType != '') {
      types.push({name: roomType, desc: ''})
    }
    this.setState({roomTypes: types, roomType: ''})
  }

  renderRoomTypes = () => {
    return (
      <div className='form-group row'>
      <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
        <ul className='list-group' style={{ background: '#252830'}}>
          {this.state.roomTypes && this.state.roomTypes.map(room => {
            return (
              <li className='list-group-item'>{room.name}</li>
            )
          })}
          <li className='list-group-item'>
            <div className='flextable'>
              <div className='flextable-item flextable-primary'>
                <TextFieldGroup
                  onChange={this.onChange}
                  field='roomType'
                  value={this.state.roomType}
                  placeholder='Room Type'
                  />
              </div>
              <div className='flextable-item'>
                <a className='btn btn-pill btn-default' onClick={e => this.handleAddRoomType()}>Add</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
        <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>

        </div>
      </div>
    )
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.name}
                field='name'
                placeholder='Name'
                error={this.state.errors.name}
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
                value={this.state.contact}
                field='contact'
                placeholder='Contact Mobile or Landline'
                error={this.state.errors.contact}
                />
            </div>
          </div>
           <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <div className='flextable'>
                <div className='flextable-item'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    value={this.state.coordinates.lat}
                    field='lat'
                    placeholder='Latitude'
                    error={this.state.errors.lat}
                    />
                </div>
                <div className='flextable-item'>
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.coordinates.lng}
                  field='lng'
                  placeholder='Longitude'
                  error={this.state.errors.lng}
                  />
                </div>
              </div>
            </div>
           </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <Map latLngCb={(coordinates) => { this.setState({coordinates: coordinates}) }} />
            </div>
          </div>
          {this.renderRoomTypes()}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-lg btn-pill btn-primary'>
            Submit
          </button>
        </ModalFooter>
      </form>
    )
  }
}

BranchCreateForm.propTypes = {

}

export default BranchCreateForm
