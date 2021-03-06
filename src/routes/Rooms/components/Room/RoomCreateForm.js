import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import TextAreaGroup from 'components/common/TextAreaGroup'
import validateInput from 'utils/validators/room'
import classnames from 'classnames'

import {ModalBody,
  ModalFooter,
  FormControl,
  InputGroup,
  DropdownButton,
  MenuItem,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton } from 'react-bootstrap'

class RoomCreateForm extends Component {
  state = {
    branchId: '',
    code: '',
    name: '',
    description: '',
    type: '',
    rate: '',
    promo: null,
    status: 'exclusive',
    selectedBranch: null,
    errors: [],
    isLoading: false
  }

  componentWillReceiveProps (nextProps) {
    let { selectedRoom, branches } = nextProps
    if (selectedRoom) {
      if (branches) {
        var data = branches.get('data')
        var selectedBranch = ''
        data.map((branch, key) => {
          if (branch.get('id') == selectedRoom.branch_id) {
            selectedBranch = branch.get('name')
          }
        })
      }
      this.setState({
        branchId: '' + selectedRoom.branch_id,
        selectedBranch: selectedBranch,
        code: selectedRoom.code,
        name: selectedRoom.name,
        description: selectedRoom.description,
        type: selectedRoom.type,
        rate: selectedRoom.rate,
        promo: selectedRoom.promo,
        status: selectedRoom.status
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

  getBranchesMenu = (data) => {
    return (
      data.map((branch, key) => {
        return (
          <MenuItem key={key} onClick={e => this.setState({branchId: '' + branch.get('id'), selectedBranch: branch.get('name')})}>{branch.get('name')}</MenuItem>
        )
      })
    )
  }

  getRoomTypesMenu = (data, id) => {
    return (
      data.map((branch, key) => {
        if (branch.get('id') == id) {
          return (
            branch.get('roomTypes') && JSON.parse(branch.get('roomTypes')).map((type, i) => {
              return (
                <MenuItem key={i} onClick={e => this.setState({type: type.name})}>{type.name}</MenuItem>
              )
            })
          )
        }
      })
    )
  }

  handleStatus = (value) => {
    this.setState({ status: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ code: '', branchId: '', selectedBranch: '', name: '',
        description: '', type: '',
        rate: '',
        promo: '', status: 'exclusive', errors: {}, isLoading: true })
      if (this.props.selectedRoom) {
        this.props.updateRoom(data)
      } else {
        this.props.createRoom(data)
      }
    }
  }

  render () {
    let { branches } = this.props
    if (branches) {
      var data = branches.get('data')
    }
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <ModalBody>
          <div className={classnames('form-group row', { 'has-error': this.state.errors.branchId })} >
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
            {this.state.errors.branchId && <small className='help-block text-right'>{this.state.errors.branchId}</small>}
              <InputGroup>
                <FormControl className='reason-input' name='branchId' type='text' value={this.state.selectedBranch} placeholder='Branch' disabled />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Branches'
                  pullRight
                  disabled={this.props.selectedRoom}>
                  {data && this.getBranchesMenu(data)}
                </DropdownButton>
              </InputGroup>
            </div>
          </div>
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
              <TextAreaGroup
                onChange={this.onChange}
                value={this.state.description}
                field='description'
                placeholder='Description'
                error={this.state.errors.description}
                />
            </div>
          </div>
          <div className={classnames('form-group row', { 'has-error': this.state.errors.type })} >
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
            {this.state.errors.type && <small className='help-block text-right'>{this.state.errors.type}</small>}
              <InputGroup>
                <FormControl className='reason-input' name='type' type='text' value={this.state.type} placeholder='Room Type' disabled />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Types'
                  pullRight
                  disabled={this.state.selectedBranch == null}>
                  {data && this.getRoomTypesMenu(data, this.state.branchId)}
                </DropdownButton>
              </InputGroup>
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.rate}
                field='rate'
                placeholder='Room Rates'
                error={this.state.errors.rate}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.promo}
                field='promo'
                placeholder='Room Promo'
                error={this.state.errors.promo}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <div className='radio-inline custom-control custom-radio'>
                <label>
                  <input type='radio' id='radio1' name='radio_req' checked={this.state.status == 'exclusive'} onClick={e => { this.setState({ status: 'exclusive' }) }} />
                  <span className='custom-control-indicator'></span>
                  Exclusive
                </label>
              </div>
              <div className='radio-inline custom-control custom-radio'>
                <label>
                  <input type='radio' id='radio2' name='radio_req' checked={this.state.status == 'open'} onClick={e => { this.setState({ status: 'open' }) }} />
                  <span className='custom-control-indicator'></span>
                  Open
                </label>
              </div>
            </div>
          </div>
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

RoomCreateForm.propTypes = {

}

export default RoomCreateForm
