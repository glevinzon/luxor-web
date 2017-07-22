import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <footer>
        <div className='container'>
          <p>&copy; 2016 Start Bootstrap. All Rights Reserved.</p>
          <ul className='list-inline'>
            <li>
              <a href='#'>Privacy</a>
            </li>
            <li>
              <a href='#'>Terms</a>
            </li>
            <li>
              <a href='#'>FAQ</a>
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
