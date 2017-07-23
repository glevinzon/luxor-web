import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import Button from 'components/common/Button'
import validateInput from 'utils/validators/reserve'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'

class ReserveForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fullName: '',
      note: '',
      email: '',
      address: '',
      contact: '',
      date: '',
      errors: [],
      isLoading: false,
      isOpen: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.show) {
      this.setState({
        isOpen: true
      })
    }
  }

  hideModal = () => {
    this.setState({
      isOpen: false
    })
  };

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
    console.log(data)
    if (this.isValid(data)) {
      this.setState({ errors: {}, isLoading: true })
      this.props.reserve(data)
    }
  }

  render () {
    return (
      <form className='form-access' onSubmit={this.onSubmit}>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} backdropStyles={{'color': '#000000'}}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle >Reserve a Room</ModalTitle>
          </ModalHeader>
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
                <TextFieldGroup
                  onChange={this.onChange}
                  value={this.state.date}
                  field='date'
                  placeholder='Date'
                  error={this.state.errors.date}
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
        </Modal>
      </form>
    )
  }
}

ReserveForm.propTypes = {

}

export default ReserveForm
