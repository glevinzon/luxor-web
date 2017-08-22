import React, { Component } from 'react'
import {Thumbnail, OverlayTrigger, Tooltip} from 'react-bootstrap'
import StackGrid, { transitions, easings } from 'react-stack-grid'
import shuffle from 'shuffle-array'
import Lightbox from 'react-images'
import ReserveForm from 'components/common/ReserveForm'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose
} from 'react-modal-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'

const transition = transitions.scaleDown

class Features extends Component {
  constructor () {
    super()

    this.state = {
      roomImages: [],
      lightboxIsOpen: false,
      currentImage: 1,
      isOpen: false,
      alert: null,
      branchId: null,
      reserved: null,
      available: null,
      errors: []
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let { branch, images, rooms, branchId, fetchingReservationsSuccess, reserves } = nextProps

    var roomImages = []
    var imagesPath = []
    if (branch && images && rooms) {
      branch && JSON.parse(branch.get('roomTypes')).map((type, key) => {
        rooms.map(room => {
          if (room.get('type') == type.name) {
            imagesPath = []
            images.map(image => {
              if (image.get('room_id') == room.get('id')) {
                imagesPath.push({src: image.get('path')})
              }
            })
            roomImages[room.get('code')] = imagesPath
          }
        })
      })
    }
    this.setState({branch: branch, rooms: rooms, roomImages: roomImages, branchId: branchId})

    if (fetchingReservationsSuccess) {
      let available = reserves.toJS()
      if (available.length > 0) {
        this.setState({
          reserved: available,
          available: (
          <SweetAlert danger title='Room is already reserved' onConfirm={e => { this.setState({available: null}) }}>
            Check the table below and choose other dates.
          </SweetAlert>
        )})
      } else {
        this.setState({
          reserved: available,
          available: (
          <SweetAlert success title='Room is available' onConfirm={e => { this.setState({available: null}) }}>
            Continue
          </SweetAlert>
        )})
      }
      this.props.getDumbReservation()
    }

    let reserveSuccess = nextProps.reserve.get('creatingReservationSuccess')
    if (reserveSuccess) {
      this.hideModal()
      this.setState({
        alertReserve: (
          <SweetAlert success title='Information Sent' onConfirm={e => { this.setState({alertReserve: null}) }}>
           The Inn will contact you shortly. Thank you!
          </SweetAlert>
         )
      })
    }
  }

  pickRandomImage = (code, images) => {
    return shuffle.pick(images[code])
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    })
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    })
  }

  openModal = (room) => {
    this.setState({
      roomId: room.get('id'),
      branchId: room.get('branch_id'),
      roomType: room.get('type'),
      room: room.get('name'),
      isOpen: true
    })
  }

  hideModal = () => {
    this.setState({
      isOpen: false,
      available: null,
      reserved: null
    })
  }

  onConfirm = () => {
  }

  render () {
    let { roomImages, branch, rooms, selectedCode, reserved, available, errors } = this.state

    return (
      <section id='features' className='features' style={{textAlign: 'center'}}>
      {this.state.alertReserve}
        {selectedCode && (
          <Lightbox
            images={roomImages[this.state.selectedCode]}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClose={this.closeLightbox}
          />
        )}
        <div className='container-fluid' >
        <h3>AVAILABLE ROOMS</h3>
        {branch && JSON.parse(branch.get('roomTypes')).map((type, key) => {
          return (
            <div key={key}>
              <div className='hr-divider'>
                <h3 className='hr-divider-content hr-divider-heading'>
                  <h4>{type.name}</h4>
                </h3>
              </div>
              <StackGrid
                monitorImagesLoaded
                columnWidth={350}
                duration={600}
                gutterWidth={15}
                gutterHeight={15}
                easing={easings.cubicOut}
                appearDelay={60}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
              >
              {!!(rooms && roomImages) && rooms.map((room, key) => {
                if ((room.get('type') == type.name) && (this.state.branchId == room.get('branch_id'))) {
                  let randomImageSrc = this.pickRandomImage(room.get('code'), roomImages)
                  return (
                    <OverlayTrigger
                      placement='top' overlay={<Tooltip id='card'>Click to see more photos.</Tooltip>}>
                    <figure className='image' key={key}>
                    <Thumbnail onClick={e => { this.setState({lightboxIsOpen: true, selectedCode: room.get('code')}) }} src={randomImageSrc ? randomImageSrc.src : ''} alt='242x200'>
                    <div className='hr-divider'>
                      <h3 className='hr-divider-content hr-divider-heading'>
                        {_.toUpper(room.get('status'))}
                      </h3>
                    </div>
                    <h3>{room.get('name')}</h3>
                      <ul className='list-group'>
                        {!!(room.get('description') && room.get('description') != '') && (<li className='list-group-item'><p>{room.get('description')}</p></li>)}
                        {!!(room.get('rate') && room.get('rate') != '') && (<li className='list-group-item'><p>{room.get('rate')}</p><span className='statcard-desc'>Rate</span></li>)}
                        {!!(room.get('promo') && room.get('promo') != '') && (<li className='list-group-item'><p>{room.get('promo')}</p><span className='statcard-desc'>Promo</span></li>)}
                      </ul>
                    </Thumbnail>
                      {room.get('status') && room.get('status') == 'exclusive' ? (<p>
                        <button onClick={e => { this.openModal(room) }} type='button' className='btn btn-lg btn-warning-outline'>Reserve {room.get('name')}</button>
                      </p>) : null}
                    </figure>
                    </OverlayTrigger>
                  )
                }
              })}
              </StackGrid>
            </div>
          )
        })}
        </div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} backdropStyles={{'color': '#000000'}}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle>Reserve {`${this.state.room} (${this.state.roomType})` || 'a Room'}</ModalTitle>
          </ModalHeader>
          <ReserveForm errors={errors} reserved={reserved} available={available} room={this.state.room} roomId={this.state.roomId} branchId={this.state.branchId} roomType={this.state.roomType} show={this.state.isOpen} {...this.props} />
        </Modal>
      </section>
    )
  }
}

Features.propTypes = {

}

export default Features
