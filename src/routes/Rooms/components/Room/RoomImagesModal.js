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
    console.log('MODAL', this.props)
    // let { images } = this.state
    // let photos = []
    // if (images) {
    //   images.map(image => {
    //     photos.push(
    //       {
    //         src: image.get('path'),
    //         thumbnail: image.get('path'),
    //         thumbnailWidth: 320,
    //         thumbnailHeight: 174,
    //         tags: [{value: image.get('code'), title: image.get('code')}, {value: image.get('createdAt'), title: 'Uploaded'}],
    //         caption: 'After Rain (Jeshu John - designerspics.com)'
    //       })
    //   })
    // }

    // let uploads = shuffle(photos).splice(0, 16)

    // console.log('MODAL', this.props)

    return (
      <Modal isOpen={this.state.show} className='room-uploads-overlay' onRequestHide={this.hideModal} >
        <ModalHeader>
          <ModalClose onClick={this.hideModal} />
          <ModalTitle>Uploads</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h4>Room Images <button type='button' className='btn btn-sm btn-pill btn-default' onClick={e => { this.props.onOpenUploadModal() }}>Upload</button></h4>
          {/* <GridGallery images={images} /> */}
        </ModalBody>
      </Modal>
    )
  }
}

RoomImagesModal.propTypes = {

}

export default RoomImagesModal
