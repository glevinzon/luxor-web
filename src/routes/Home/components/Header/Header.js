import React, { Component } from 'react'
import ReserveForm from './ReserveForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'

class Header extends Component {
  state = {
    isOpen: false,
    alert: null
  }

  componentWillReceiveProps (nextProps) {
    let reserveSuccess = nextProps.reserve.get('creatingReservationSuccess')
    if (reserveSuccess) {
      this.hideModal()
      this.setState({
        alert: (
          <SweetAlert success title='Information Sent' onConfirm={e => { this.setState({alert: null}) }}>
          The Inn will contact you shortly. Thank you!
          </SweetAlert>
        )
      })
    }
  }

  openModal = () => {
    this.setState({
      isOpen: true
    })
  }

  hideModal = () => {
    this.setState({
      isOpen: false
    })
  }

  onConfirm = () => {
    console.log('wew')
  }

  render () {
    return (
      <header style={{ background: 'url("img/gensan-side.JPG")', backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        {this.state.alert}
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='header-content'>
                <div className='header-content-inner'>
                  <h1> A very good place to be.</h1>
                  <a href='#download' className='btn btn-outline btn-xl page-scroll' onClick={this.openModal} >Reserve Now!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} backdropStyles={{'color': '#000000'}}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle >Reserve a Room</ModalTitle>
          </ModalHeader>
          <ReserveForm show={this.state.isOpen} {...this.props} />
        </Modal>

      </header>
    )
  }
}

Header.propTypes = {

}

export default Header
