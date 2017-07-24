import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Contact extends Component {
  render () {
    return (
      <section id='contact' className='contact bg-primary'>
        <div className='container'>
          <h2>We <i className='fa fa-heart'></i> our customers! Connect to us.</h2>
          <ul className='list-inline list-social'>
            <li className='social-twitter'>
              <a href='#'><i className='fa fa-twitter'></i></a>
            </li>
            <li className='social-facebook'>
              <a href='#'><i className='fa fa-facebook'></i></a>
            </li>
            <li className='social-google-plus'>
              <a href='#'><i className='fa fa-google-plus'></i></a>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

Contact.propTypes = {

}

export default Contact
