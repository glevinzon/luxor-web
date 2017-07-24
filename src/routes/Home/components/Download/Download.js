import React, { Component } from 'react'
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'

class Download extends Component {
  constructor (props) {
    super(props)
  }
  onSelect= (active, direction) => {
    console.log(`active=${active} && direction=${direction}`)
  }
  render () {
    return (
      <section id='download' className='download bg-primary text-center'>
        <React_Bootstrap_Carousel
          animation
          slideshowSpeed={'5000'}
          onSelect={this.onSelect}
          className='carousel-fade'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                <h2 className='section-heading'>Stay with us, and feel like home…</h2>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                <h2 className='section-heading'>Ad deserunt excepteur ullamco magna esse laborum id minim et cillum amet.</h2>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                <h2 className='section-heading'>Ex eiusmod qui mollit commodo Lorem ipsum dolor exercitation.</h2>
              </div>
            </div>
          </div>
        </React_Bootstrap_Carousel>
      </section>
    )
  }
}

Download.propTypes = {

}

export default Download
