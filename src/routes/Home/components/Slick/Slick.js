import React, { Component } from 'react'
import Slider from 'react-slick'

class Slick extends Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: function (currentSlide, nextSlide) {
        console.log('before change', currentSlide, nextSlide)
      }
    }

    return (
      <section id='download' className='download bg-primary text-center'>
        <Slider {...settings}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Slider>
      </section>
    )
  }
}

Slick.propTypes = {

}

export default Slick
