import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cta extends Component {
  render () {
    return (
      <section id='cta' className='cta'>
        <div className='cta-content'>
          <div className='container'>
            <h2>Stop waiting.<br />Start building.</h2>
            <a href='#contact' className='btn btn-outline btn-xl page-scroll'>Let's Get Started!</a>
          </div>
        </div>
        <div className='overlay'></div>
      </section>
    )
  }
}

Cta.propTypes = {

}

export default Cta
