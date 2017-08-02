import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/room'
import classnames from 'classnames'

import {
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import {FormControl, FormGroup, InputGroup, DropdownButton, MenuItem} from 'react-bootstrap'

class RoomCreateForm extends Component {
  state = {
    branchId: '',
    name: '',
    description: '',
    type: '',
    rate: '',
    promo: null,
    selectedBranch: null,
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

  getBranchesMenu = (data) => {
    return (
      data.map((branch, key) => {
        return (
          <MenuItem key={key} onClick={e => this.setState({branchId: '' + branch.get('id'), selectedBranch: branch.get('name')})}>{branch.get('name')}</MenuItem>
        )
      })
    )
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ name: '',
        description: '', type: '',
        rate: '',
        promo: '', errors: {}, isLoading: true })
      this.props.createRoom(data)
    }
  }

  render () {
    let { branches } = this.props
    if (branches) {
      var total = branches.get('total')
      var currentPage = branches.get('currentPage')
      var lastPage = branches.get('lastPage')
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
                  pullRight>
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
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.description}
                field='description'
                placeholder='Description'
                error={this.state.errors.description}
                />
            </div>
          </div>
          <div className='form-group row'>
            <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.type}
                field='type'
                placeholder='Room Type'
                error={this.state.errors.type}
                />
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
