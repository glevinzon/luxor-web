import React, { Component } from 'react'
import {Thumbnail, Button} from 'react-bootstrap'
import StackGrid, { transitions, easings } from 'react-stack-grid'
import shuffle from 'shuffle-array'
import Lightbox from 'react-images'

const transition = transitions.scaleDown

class Features extends Component {
  constructor () {
    super()

    this.state = {
      roomImages: [],
      lightboxIsOpen: false,
      currentImage: 1
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    let { branch, images, rooms } = nextProps
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
    this.setState({branch: branch, rooms: rooms, roomImages: roomImages})
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

  render () {
    console.log(this.state.roomImages)
    let { roomImages, branch, rooms, selectedCode } = this.state

    return (
      <section id='features' className='features'>
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
                if (room.get('type') == type.name) {
                  let randomImageSrc = this.pickRandomImage(room.get('code'), roomImages)
                  return (
                    <figure className='image' key={key} style={{textAlign: 'center'}}>
                    <Thumbnail onClick={e => { this.setState({lightboxIsOpen: true, selectedCode: room.get('code')}) }} src={randomImageSrc ? randomImageSrc.src : ''} alt='242x200'>
                      <h3>{room.get('name')}</h3>
                      <ul className='list-group'>
                        {!!(room.get('description') && room.get('description') != '') && (<li className='list-group-item'><p>{room.get('description')}</p></li>)}
                        {!!(room.get('rate') && room.get('rate') != '') && (<li className='list-group-item'><p>{room.get('rate')}</p></li>)}
                        {!!(room.get('promo') && room.get('promo') != '') && (<li className='list-group-item'><p>{room.get('promo')}</p></li>)}
                      </ul>
                    </Thumbnail>
                      <p>
                        <button type='button' className='btn btn-lg btn-warning-outline'>Reserve {room.get('name')}</button>
                      </p>
                    </figure>
                  )
                }
              })}
              </StackGrid>
            </div>
          )
        })}
        </div>
      </section>
    )
  }
}

Features.propTypes = {

}

export default Features
