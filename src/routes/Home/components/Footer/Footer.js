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
                <a className='page-scroll' href='#features'>Rooms</a>
              </li>
              <li>
                <a className='page-scroll' href='#location'>Location</a>
              </li>
              <li>
                <a className='page-scroll' href='#contact'>Contact</a>
              </li>
              <li>
                <a className='page-scroll' href='#faqs'>FAQ</a>
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
