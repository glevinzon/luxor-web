import React, { Component } from 'react'
import { React_Bootstrap_Carousel } from 'react-bootstrap-carousel'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'

class Download extends Component {
  state = {
    statements: null
  }
  componentWillReceiveProps (nextProps) {
    let { preferences } = nextProps
    if (preferences) {
      this.setState({statements: preferences.carouselTexts})
    }
  }

  onSelect= (active, direction) => {
  }
  render () {
    console.log(this.state.statements)
    return (
      <section id='download' className='download bg-primary text-center'>
        {this.state.statements && (
          <React_Bootstrap_Carousel
            animation
            slideshowSpeed={'5000'}
            onSelect={this.onSelect}
            className='carousel-fade'>
            {this.state.statements.map(text => {
              return (
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-8 col-md-offset-2'>
                      <h2 className='section-heading'>{text.name}</h2>
                    </div>
                  </div>
                </div>
              )
            })}
          </React_Bootstrap_Carousel>
        )}
      </section>
    )
  }
}

Download.propTypes = {

}

export default Download
