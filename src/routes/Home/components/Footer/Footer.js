import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer>
        <div className='container'>
          <div className='container'>
            <p>&copy; Luxor One Traveller's Inn</p>
            <ul className='list-inline'>
              <li>
                <a href='#features'>Rooms</a>
              </li>
              <li>
                <a href='#location'>Location</a>
              </li>
              <li>
                <a href='#contact'>Contact</a>
              </li>
              <li>
                <a href='#faqs'>FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {

}

export default Footer
