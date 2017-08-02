import React, { Component } from 'react'
import BranchCreateForm from './BranchCreateForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class BranchModal extends Component {

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
          <ModalTitle >Create New Branch</ModalTitle>
        </ModalHeader>
        <BranchCreateForm {...this.props} />
      </Modal>
    )
  }
}

BranchModal.propTypes = {

}

export default BranchModal
