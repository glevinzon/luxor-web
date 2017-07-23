import React, { Component } from 'react'
import ReserveForm from './ReserveForm'

class Header extends Component {
  state = {
    isOpen: false
  }

  openModal = () => {
    this.setState({
      isOpen: true
    })
  }

  render () {
    return (
      <header>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='header-content'>
                <div className='header-content-inner'>
                  <h1>Keep calm! Winter is here.</h1>
                  <a href='#download' className='btn btn-outline btn-xl page-scroll' onClick={this.openModal} >Reserve Now!</a>
                </div>
              </div>
            </div>
            <div className='col-sm-5'>
              <div className='device-container'>
                <div className='device-mockup iphone6_plus portrait white'>
                  <div className='device'>
                    <div className='screen'>
                      <img src='img/demo-screen-1.jpg' className='img-responsive' alt='' />
                    </div>
                    <div className='button'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReserveForm show={this.state.isOpen} {...this.props} />
      </header>
    )
  }
}

Header.propTypes = {

}

export default Header
