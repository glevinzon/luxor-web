import React, { Component } from 'react'

class Download extends Component {
  render () {
    return (
      <section id='download' className='download bg-primary text-center'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
              <h2 className='section-heading'>Discover what all the buzz is about!</h2>
              <p>Our app is available on any mobile device! Download now to get started!</p>
              <div className='badges'>
                <a className='badge-link' href='#'><img src='img/google-play-badge.svg' alt='' /></a>
                <a className='badge-link' href='#'><img src='img/app-store-badge.svg' alt='' /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Download.propTypes = {

}

export default Download
