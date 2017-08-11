import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/branch'
import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import Map from 'components/common/Map'
import SweetAlert from 'react-bootstrap-sweetalert'

class BranchCreateForm extends Component {
  state = {
    code: '',
    name: '',
    address: '',
    coordinates: '',
    contact: '',
    roomTypes: [],
    roomType: null,
    errors: [],
    isLoading: false,
    lat: null,
    lng: null,
    alert: null
  }

  componentWillReceiveProps (nextProps) {
    let { selectedBranch } = nextProps
    if (selectedBranch) {
      this.setState({
        code: selectedBranch.get('code'),
        name: selectedBranch.get('name'),
        address: selectedBranch.get('address'),
        coordinates: JSON.parse(selectedBranch.get('coordinates')),
        contact: selectedBranch.get('contact'),
        roomTypes: JSON.parse(selectedBranch.get('roomTypes'))
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
    let data = this.state
    if (data.roomTypes.length < 1 || data.roomTypes.length == null) {
      this.setState({alert: (
          <SweetAlert warning title='Oh! No.' onConfirm={e => { this.setState({alert: null}) }}>
            No room types! Please add one.
          </SweetAlert>
        )})
    } else {
      if (this.isValid(data)) {
        data.coordinates = JSON.stringify({lat: this.state.lat || this.state.coordinates.lat, lng: this.state.lng || data.coordinates.lng})
        data.roomTypes = JSON.stringify(data.roomTypes)
        this.setState({ code: '', name: '',
          contact: '', address: '',
          coordinates: {lat: null, lng: null}, lat: null, lng: null,
          roomTypes: null, roomType: '', errors: {}, isLoading: true })

        if (this.props.selectedBranch) {
          this.props.updateBranch(data)
        } else {
          this.props.createBranch(data)
        }
      }
    }
  }

  handleAddRoomType = () => {
    let {roomType, roomTypes} = this.state
    let types = roomTypes || []
    if (roomType != '' && roomType != null) {
      types.push({name: roomType, desc: ''})
    }
    this.setState({roomTypes: types, roomType: ''})
  }

  handleRoomTypeDeletion = (index) => {
    let {roomTypes} = this.state
    if (roomTypes) {
      var testArray = roomTypes
      testArray.splice(index, 1)
      this.setState({roomTypes: testArray})
    }
  }

  renderRoomTypes = () => {
    return (
      <div className='form-group row'>
      <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
        <ul className='list-group' style={{ background: '#252830'}}>
          {this.state.roomTypes && this.state.roomTypes.map((room, key) => {
            return (
              <li key={key} className='list-group-item'>{room.name}&nbsp;<button type='button' className='btn btn-xs btn-pill btn-danger' onClick={e => { this.handleRoomTypeDeletion(key) }}>Delete</button></li>
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
    var coords = (this.state.lat != null && this.state.lng != null) ? {lat: this.state.lat, lng: this.state.lng} : {lat: null, lng: null}
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
      {this.state.alert}
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
                    value={this.state.lat || this.state.coordinates.lat}
                    field='lat'
                    placeholder='Latitude'
                    error={this.state.errors.lat}
                    />
                </div>
                <div className='flextable-item'>
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.lng || this.state.coordinates.lng}
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
              <Map coordinates={coords != null ? coords : null} latLngCb={(coordinates) => { this.setState({coordinates: coordinates, lat: null, lng: null}) }} />
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
