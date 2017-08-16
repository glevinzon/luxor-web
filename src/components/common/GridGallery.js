import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Gallery from 'react-grid-gallery/lib/Gallery'
import CheckButton from 'react-grid-gallery/lib/CheckButton'

class GridGallery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: this.props.images,
      selectAllChecked: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({images: nextProps.images})
  }

  allImagesSelected = (images) => {
    var f = images.filter(
            function (img) {
              return img.isSelected == true
            }
        )
    return f.length == images.length
  }

  onSelectImage = (index, image) => {
    var images = this.state.images.slice()
    var img = images[index]
    if (img.hasOwnProperty('isSelected')) { img.isSelected = !img.isSelected } else { img.isSelected = true }

    this.setState({
      images: images
    })

    if (this.allImagesSelected(images)) {
      this.setState({
        selectAllChecked: true
      })
    } else {
      this.setState({
        selectAllChecked: false
      })
    }
  }

  getSelectedImages = () => {
    var selected = []
    for (var i = 0; i < this.state.images.length; i++) {
      if (this.state.images[i].isSelected == true) { selected.push(this.state.images[i].code) }
    }
    return selected
  }

  onClickSelectAll = () => {
    var selectAllChecked = !this.state.selectAllChecked
    this.setState({
      selectAllChecked: selectAllChecked
    })

    var images = this.state.images.slice()
    if (selectAllChecked) {
      for (var i = 0; i < this.state.images.length; i++) { images[i].isSelected = true }
    } else {
      for (var i = 0; i < this.state.images.length; i++) { images[i].isSelected = false }
    }
    this.setState({
      images: images
    })
  }

  handleDeleteUploads = (selectedImages) => {
    if (selectedImages.length > 0) {
      this.props.deleteUploadsByCodes({roomCodes: JSON.stringify(selectedImages)})
      this.setState({selectAllChecked: false, images: null})
    }
  }
  render () {
    return (
      <div>
        <CheckButton
          index={0}
          isSelected={this.state.selectAllChecked}
          onClick={this.onClickSelectAll}
          parentHover
          color={'rgba(0,0,0,0.54)'}
          selectedColor={'#4285f4'}
          hoverColor={'rgba(0,0,0,0.54)'} />
        <div style={{
          height: '36px',
          display: 'flex',
          alignItems: 'center'
        }}> select all </div>
        <button type='button' disabled={this.getSelectedImages().length < 1} className='btn btn-sm btn-pill btn-danger' onClick={e => { this.handleDeleteUploads(this.getSelectedImages()) }}>Delete</button>
        <div style={{
          display: 'block',
          minHeight: '1px',
          width: '100%',
          border: '0px solid #ddd',
          overflow: 'auto'}}>
          <Gallery
            images={this.state.images}
            onSelectImage={this.onSelectImage}
            showLightboxThumbnails />
        </div>
      </div>
    )
  }
}

GridGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      srcset: PropTypes.array,
      caption: PropTypes.string,
      thumbnailWidth: PropTypes.number.isRequired,
      thumbnailHeight: PropTypes.number.isRequired,
      isSelected: PropTypes.bool
    })
  ).isRequired
}

export default GridGallery
