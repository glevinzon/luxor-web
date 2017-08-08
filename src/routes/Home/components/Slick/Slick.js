import React, { Component } from 'react'
import Slider from 'react-slick'
import shuffle from 'shuffle-array'

class Slick extends Component {
  state = {
    types: null,
    branchCode: null,
    rooms: null
  }

  componentWillReceiveProps (nextProps) {
    let { branch, rooms } = nextProps
    var image = []
    if (branch && rooms) {
      var arrKey = Object.keys(rooms)
      JSON.parse(branch.get('roomTypes')).map(type => {
        arrKey.map(key => {
          for (var i = 0; i < 5; i++) {
            if (key === `${type.name}_roomImage${i}`) {
              if (image.length < 1) {
                image.push({ url: rooms[`${key}`].imageUrl, caption: 'No Caption', orientation: 'square', useForDemo: true })
              } else {
                image.push({ url: rooms[`${key}`].imageUrl, caption: 'No Caption', orientation: 'landscape', useForDemo: true })
              }
            }
          }
        })
      })
      let images = []
      if (image.length > 1) {
        images = shuffle.pick(image, { 'picks': 2 })
      } else if (image.length == 1) {
        images = shuffle.pick(image, { 'picks': 1 })
      } else {
        images = null
      }
      this.setState({types: JSON.parse(branch.get('roomTypes')), branchCode: branch.get('code'), rooms: images})
    }
  }

  render () {
    console.log(this.state.rooms)
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      beforeChange: function (currentSlide, nextSlide) {
        console.log('before change', currentSlide, nextSlide)
      }
    }

    return (
      <section id='carousel' className='carousel bg-primary' style={{padding: '0px', minHeight: '100%'}}>
        <Slider {...settings} >
          <div style={{ background: `url(${this.state.rooms ? this.state.rooms[0].url : ''}) center center / auto 100% no-repeat`, height: '420px', width: '100%' }} />
          <div style={{ background: `url(${this.state.rooms ? this.state.rooms[1].url : ''}) center center / auto 100% no-repeat`, height: '420px', width: '100%' }} />
        </Slider>
      </section>
    )
  }
}

Slick.propTypes = {

}

export default Slick
