import React, { Component } from 'react'
import RoomCreateForm from './RoomCreateForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class RoomModal extends Component {

  hideModal = () => {
    this.setState({
      isOpen: false
    })
    this.props.onClose()
  }

  render () {
    return (
      <Modal isOpen={this.props.open} onRequestHide={this.hideModal} backdropStyles={{'color': '#000000'}}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Create New Room</ModalTitle>
        </ModalHeader>
        <RoomCreateForm {...this.props} />
      </Modal>
    )
  }
}

RoomModal.propTypes = {

}

export default RoomModal
