import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import SweetAlert from 'react-bootstrap-sweetalert'

class RoomImages extends Component {
  state = {
    roomImages: null,
    alert: null
  }

  componentWillMount () {
    let data = this.state
    data.alert = null
    this.props.preferencesCb(data)
  }

  componentWillReceiveProps (nextProps, nextState) {
    let { target, upload, uploadingImageSuccess, branch, rooms } = nextProps
    let { roomImages } = this.state

    if (uploadingImageSuccess) {
      // this.props.getDumb()
      if (roomImages != null) {
        var url = roomImages
        var arrKeys = Object.keys(url)
        arrKeys.map(key => {
          if (target == key) {
            url[target] = roomImages[key]
            url[target].imageUrl = upload
          }
        })
        this.setState({ roomImages: url, alert: (
          <SweetAlert success title='Upload Success' onConfirm={e => { this.handleUploadSuccess(url) }}>
            Sweet!
          </SweetAlert>
        )})
      }
    }
    if (rooms) {
      this.setState({...rooms})
    }
  }

  handleUploadSuccess = (url) => {
    let data = this.state
    data.roomImages = url
    data.alert = null
    this.props.preferencesCb(data)
    this.props.inceptionCb()
    this.setState({alert: null})
  }

  onDrop = (accepted, target) => {
    let { roomImages } = this.state
    let room = {}

    if (roomImages != null) {
      room = roomImages
      var arrKeys = Object.keys(roomImages)
      arrKeys.map(key => {
        if (key == target) {
          room[target] = roomImages[key]
          room[target].imageFile = accepted[0]
        } else {
          room[target] = {imageUrl: '', imageFile: accepted[0]}
        }
      })
    } else {
      room[target] = {imageUrl: '', imageFile: accepted[0]}
    }

    this.setState({ roomImages: room })

    var formData = new FormData()
    formData.append('image', accepted[0])

    this.props.uploadImage(formData, target)
  }

  render () {
    let { roomImages } = this.state
    let { branch } = this.props

    console.log('ROOMS', this.state)
    return (
      <div>
      {this.state.alert}
        {branch && JSON.parse(branch.get('roomTypes')).map((room, i) => {
          return (
            <ul key={i} className='list-group'>
              <li className='list-group-header'>{room.name}</li>
              <li className='list-group-item'>
                <div className='flextable'>
                  <div className='flextable-item'>
                    <Dropzone
                      multiple={false}
                      accept='image/jpeg, image/png'
                      onDrop={(accepted, rejected) => this.onDrop(accepted, `${room.name}_roomImage0`)}>
                            {roomImages != null && roomImages[`${room.name}_roomImage0`] ? (<div className='roomImage0' style={{ background: `url(${roomImages[`${room.name}_roomImage0`].imageUrl || roomImages[`${room.name}_roomImage0`].imageFile.preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>) : null}
                            {roomImages == null ? (<p style={{ textAlign: 'center' }}>Drop an image here</p>) : null}
                    </Dropzone>
                  </div>
                  <div className='flextable-item'>
                    <Dropzone
                      multiple={false}
                      accept='image/jpeg, image/png'
                      onDrop={(accepted, rejected) => this.onDrop(accepted, `${room.name}_roomImage1`)}>
                            {roomImages != null && roomImages[`${room.name}_roomImage1`] ? (<div className='roomImage1' style={{ background: `url(${roomImages[`${room.name}_roomImage1`].imageUrl || roomImages[`${room.name}_roomImage1`].imageFile.preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>) : null}
                            {roomImages == null ? (<p style={{ textAlign: 'center' }}>Drop an image here</p>) : null}
                    </Dropzone>
                  </div>
                  <div className='flextable-item'>
                    <Dropzone
                      multiple={false}
                      accept='image/jpeg, image/png'
                      onDrop={(accepted, rejected) => this.onDrop(accepted, `${room.name}_roomImage2`)}>
                            {roomImages != null && roomImages[`${room.name}_roomImage2`] ? (<div className='roomImage2' style={{ background: `url(${roomImages[`${room.name}_roomImage2`].imageUrl || roomImages[`${room.name}_roomImage2`].imageFile.preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>) : null}
                            {roomImages == null ? (<p style={{ textAlign: 'center' }}>Drop an image here</p>) : null}
                    </Dropzone>
                  </div>
                  <div className='flextable-item'>
                    <Dropzone
                      multiple={false}
                      accept='image/jpeg, image/png'
                      onDrop={(accepted, rejected) => this.onDrop(accepted, `${room.name}_roomImage3`)}>
                            {roomImages != null && roomImages[`${room.name}_roomImage3`] ? (<div className='roomImage3' style={{ background: `url(${roomImages[`${room.name}_roomImage3`].imageUrl || roomImages[`${room.name}_roomImage3`].imageFile.preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>) : null}
                            {roomImages == null ? (<p style={{ textAlign: 'center' }}>Drop an image here</p>) : null}
                    </Dropzone>
                  </div>
                  <div className='flextable-item'>
                    <Dropzone
                      multiple={false}
                      accept='image/jpeg, image/png'
                      onDrop={(accepted, rejected) => this.onDrop(accepted, `${room.name}_roomImage4`)}>
                            {roomImages != null && roomImages[`${room.name}_roomImage4`] ? (<div className='roomImage4' style={{ background: `url(${roomImages[`${room.name}_roomImage4`].imageUrl || roomImages[`${room.name}_roomImage4`].imageFile.preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>) : null}
                            {roomImages == null ? (<p style={{ textAlign: 'center' }}>Drop an image here</p>) : null}
                    </Dropzone>
                  </div>
                </div>
              </li>
            </ul>)
        })}
      </div>
    )
  }
}

RoomImages.propTypes = {

}

export default RoomImages
