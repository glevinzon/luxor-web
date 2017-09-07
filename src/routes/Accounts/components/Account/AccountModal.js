import React, { Component } from 'react'
import AccountChangePasswordForm from './AccountChangePasswordForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'

class AccountModal extends Component {
  hideModal = () => {
    this.props.onClose()
  }

  render () {
    return (
      <Modal isOpen={this.props.open} onRequestHide={this.hideModal} backdropStyles={{'color': '#000000'}}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Change Password</ModalTitle>
        </ModalHeader>
        <AccountChangePasswordForm {...this.props} />
      </Modal>
    )
  }
}

AccountModal.propTypes = {

}

export default AccountModal
