import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer>
        <div className='container'>
          <p>&copy; Luxor One Traveller's Inn</p>
          <ul className='list-inline'>
            <li>
              <a href='#features'>Rooms</a>
            </li>
            <li>
              <a href='#cta'>Amenities</a>
            </li>
            <li>
              <a href='#contact'>Contact</a>
            </li>
            <li>
              <a href='#fqa'>FAQ</a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {

}

export default Footer
