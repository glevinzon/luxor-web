import React, { Component } from 'react'
import TextFieldGroup from 'components/common/TextFieldGroup'
import classnames from 'classnames'
import Dropzone from 'react-dropzone'
import FormData from 'form-data'
import RoomImages from './RoomImages'
import SweetAlert from 'react-bootstrap-sweetalert'

class Preferences extends Component {
  state = {
    headerTitle: '',
    headerBgImage: null,
    carouselTexts: null,
    carouselText: null,
    errors: [],
    isLoading: false,
    accepted: null,
    alert: null
  }

  componentWillMount () {
    let { fetchingSettingsSuccess, preferences, branch } = this.props
    if (fetchingSettingsSuccess && preferences) {
      var prefKeys = Object.keys(preferences)
      prefKeys.map(key => {
        if (key == branch.get('code')) {
          this.setState({ ...preferences[`${key}`] })
        }
      })
    }
  }

  componentDidMount () {
    let data = this.state
    data.alert = null
    this.props.settingsCb(data, this.props.branch.get('code'), false)
  }

  componentWillReceiveProps (nextProps, nextState) {
    let { target, upload, uploadingImageSuccess, branch, uploadingImage } = nextProps

    if (uploadingImageSuccess) {
      if (target === `${branch.get('code')}_headerBgImage`) {
        this.setState({headerBgImage: upload, alert: (
          <SweetAlert success title='Upload Success' onConfirm={e => { this.handleUploadSuccess() }}>
            Sweet!
          </SweetAlert>
        )})
      }
    }
  }

  handleUploadSuccess = () => {
    this.setState({alert: null})
    let data = this.state
    data.alert = null
    this.props.settingsCb(data, this.props.branch.get('code'), true)
  }

  onDrop = (accepted, target) => {
    var formData = new FormData()
    formData.append('image', accepted[0])

    this.props.uploadImage(formData, target)
    this.setState({ accepted })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    let data = this.state
    if (e.target.name === 'headerTitle') {
      data.headerTitle = e.target.value
      data.alert = null
    }
    this.props.settingsCb(data, this.props.branch.get('code'), false)
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  handleAddCarouselText = () => {
    let {carouselText, carouselTexts} = this.state
    let texts = carouselTexts || []
    if (carouselText != '' && carouselText != null) {
      texts.push({name: carouselText})
    }
    this.setState({carouselTexts: texts, carouselText: ''})
    let data = this.state
    data.carouselTexts = texts
    data.carouselText = null
    data.alert = null
    this.props.settingsCb(data, this.props.branch.get('code'), false)
  }

  renderCarouselTexts = () => {
    return (
      <div className='form-group row'>
        <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
          <ul className='list-group' style={{ background: '#252830'}}>
            {this.state.carouselTexts && this.state.carouselTexts.map((text, i) => {
              return (
                <li key={i} className='list-group-item'>{text.name}</li>
              )
            })}
            <li className='list-group-item'>
              <div className='flextable'>
                <div className='flextable-item flextable-primary'>
                  <TextFieldGroup
                    onChange={this.onChange}
                    field='carouselText'
                    value={this.state.carouselText}
                    placeholder='Carousel Texts'
                    />
                </div>
                <div className='flextable-item'>
                  <a className='btn btn-pill btn-default' onClick={e => this.handleAddCarouselText()}>Add</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>

        </div>
      </div>
    )
  }

  // handlePreferencesCb = (rooms, upload) => {
  //   let data = this.state
  //   data.rooms = rooms
  //   data.alert = null
  //   this.props.settingsCb(data, this.props.branch.get('code'), upload)
  // }

  // renderRoomImages = (rooms) => {
  //   return (
  //     <RoomImages rooms={rooms} preferencesCb={(rooms, upload) => this.handlePreferencesCb(rooms, upload)} {...this.props} />
  //   )
  // }

  render () {
    let { branch } = this.props
    let { rooms } = this.state
    return (
      <form className='form-access container' style={{ paddingTop: '1em' }}>
        {this.state.alert}
        <div className='form-group row'>
          <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
            <TextFieldGroup
              onChange={this.onChange}
              value={this.state.headerTitle}
              field='headerTitle'
              placeholder='Masthead Title'
              error={this.state.errors.headerTitle}
              />
          </div>
        </div>
        <div className='form-group row'>
          <div className='input-group col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10'>
          <TextFieldGroup
            disabled
            onChange={this.onChange}
            value={this.state.headerBgImage}
            field='headerBgImage'
            placeholder='Masthead Background Image'
            error={this.state.errors.headerBgImage}
            />
          <Dropzone
            style={{ width: '100%',
              height: '500px',
              borderWidth: '2px',
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: '5px' }}
            multiple={false}
            accept='image/jpeg, image/png'
            onDrop={(accepted, rejected) => this.onDrop(accepted, `${branch.get('code')}_headerBgImage`)}>
                {(this.state.accepted || this.state.headerBgImage) && (<div className='headerBgImage' style={{ background: `url(${this.state.headerBgImage || this.state.accepted[0].preview}) center center / auto 100% no-repeat`, height: '100%', width: '100%' }} ></div>)}
                {(!this.state.accepted || !this.state.headerBgImage) && (<p style={{ textAlign: 'center' }}>Drop an image here, or click to select file to upload.</p>)}
            </Dropzone>
          </div>
        </div>
        {this.renderCarouselTexts()}
      </form>
    )
  }
}

Preferences.propTypes = {

}

export default Preferences
