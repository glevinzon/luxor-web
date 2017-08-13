import React, { Component } from 'react'
import {Thumbnail, Button} from 'react-bootstrap'
import StackGrid, { transitions, easings } from 'react-stack-grid'
import shuffle from 'shuffle-array'

const transition = transitions.scaleDown

class Features extends Component {
  state = {
    roomImages: []
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
                imagesPath.push(image.get('path'))
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

  render () {
    let { roomImages, branch, rooms } = this.state

    return (
      <section id='features' className='features'>
        <div className='container-fluid' >
        {branch && JSON.parse(branch.get('roomTypes')).map((type, key) => {
          return (
            <div key={key}>
              <div className='hr-divider'>
                <h3 className='hr-divider-content hr-divider-heading'>
                  <h3>{type.name}</h3>
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
                    <figure className='image' key='key1'><Thumbnail style={{textAlign: 'center'}} src={randomImageSrc} alt='242x200'>
                      <h3>{room.get('name')}</h3>
                      <ul className='list-group'>
                        {room.get('description') && (<li className='list-group-item'><p>{room.get('description')}</p></li>)}
                        {room.get('rate') && (<li className='list-group-item'><p>{room.get('rate')}</p></li>)}
                        {room.get('promo') && (<li className='list-group-item'><p>{room.get('promo')}</p></li>)}
                      </ul>
                      <p>
                        <button type='button' className='btn btn-lg btn-warning-outline'>Reserve</button>
                      </p>
                    </Thumbnail></figure>
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
