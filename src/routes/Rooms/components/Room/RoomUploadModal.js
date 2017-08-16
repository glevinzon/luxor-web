import React, { Component } from 'react'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalFooter
} from 'react-modal-bootstrap'
import Dropzone from 'react-dropzone'
import SweetAlert from 'react-bootstrap-sweetalert'

class RoomUploadModal extends Component {
  state = {
    open: false
  }

  componentWillReceiveProps (nextProps) {
    let { open } = nextProps
    if (open) {
      this.showModal()
    }
  }

  showModal = () => {
    this.setState({open: true})
  }

  hideModal = () => {
    this.setState({open: false, accepted: null})
    this.props.onCloseCb()
  }

  onDrop = (accepted, target) => {
    this.setState({ accepted })
  }

  handleUploadAction = (target, roomId) => {
    let { accepted } = this.state
    if (accepted) {
      var formData = new FormData()
      formData.append('image', accepted[0])

      this.props.uploadImage(formData, target, roomId)
    }
    this.hideModal()
  }

  render () {
    let { room } = this.props
    return (
      <Modal isOpen={this.props.open} onRequestHide={this.hideModal}>
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle >Upload New {room.name} Image</ModalTitle>
        </ModalHeader>
        <Dropzone
          style={{ width: '100%',
            height: '500px',
            borderWidth: '2px',
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: '5px' }}
          multiple={false}
          accept='image/jpeg, image/png'
          onDrop={(accepted, rejected) => this.onDrop(accepted)}>
          {(this.state.accepted) && (<div className='headerBgImage' style={{ background: `url(${this.state.accepted[0].preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>)}
          {(!this.state.accepted) && (<p style={{ textAlign: 'center' }}>Drop an image here, or click to select file to upload.</p>)}
        </Dropzone>
        <ModalFooter>
          <button className='btn btn-primary' onClick={e => this.handleUploadAction(room.name, room.id)}>
            Upload
          </button>
        </ModalFooter>
      </Modal>
    )
  }
}

RoomUploadModal.propTypes = {

}

export default RoomUploadModal
