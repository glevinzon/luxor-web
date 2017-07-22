import React, { Component } from 'react'

class MainNav extends Component {
  render () {
    return (
      <nav id='mainNav' className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
              <span className='sr-only'>Toggle navigation</span> Menu <i className='fa fa-bars'></i>
            </button>
            <a className='navbar-brand page-scroll' href='#page-top'>Luxor One Traveller Inn</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a className='page-scroll' href='#download'>Rooms</a>
              </li>
              <li>
                <a className='page-scroll' href='#features'>Amenities</a>
              </li>
              <li>
                <a className='page-scroll' href='#contact'>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

MainNav.propTypes = {

}

export default MainNav
