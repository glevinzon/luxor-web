import React, { Component } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'
import GridGallery from 'components/common/GridGallery'
import shuffle from 'shuffle-array'
import moment from 'moment'

class RoomImagesModal extends Component {
  state = {
    show: false
  }

  componentWillReceiveProps (nextProps) {
    let { show } = nextProps
    if (show) {
      this.showModal()
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
    this.props.onCloseCb()
  }

  render () {
    let {roomImages} = this.props
    if (roomImages) {
      var photos = []
      roomImages.map(image => {
        photos.push({
          src: image.get('path'),
          thumbnail: image.get('path'),
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          tags: [{value: image.get('code'), title: image.get('code')}, {value: moment(image.get('createdAt')).format('LLLL'), title: 'Uploaded'}],
          caption: `Image uploaded : ${moment(image.get('createdAt')).format('LLLL')}`
        })
      })
      // var uploads = shuffle(photos).splice(0, 16)
    }

    return (
      <Modal isOpen={this.state.show} className='room-uploads-overlay' onRequestHide={this.hideModal} >
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle>Uploads</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h4>Room Images <button type='button' className='btn btn-sm btn-pill btn-default' onClick={e => { this.props.onOpenUploadModal() }}>Upload</button></h4>
          {roomImages && (<GridGallery images={photos} />)}
        </ModalBody>
      </Modal>
    )
  }
}

RoomImagesModal.propTypes = {

}

export default RoomImagesModal
