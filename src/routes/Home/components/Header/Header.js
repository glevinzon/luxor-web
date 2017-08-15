import React, { Component } from 'react'

class Header extends Component {
  state = {
    isOpen: false,
    alert: null,
    bgImage: null,
    title: null
  }

  componentWillReceiveProps (nextProps) {
    let { preferences } = nextProps
    if (preferences) {
      this.setState({bgImage: preferences.headerBgImage, title: preferences.headerTitle})
    }
  }

  render () {
    return (
      <header style={{ background: `url(${this.state.bgImage}) center center /  100% 100% no-repeat`, height: '100%', width: '100%' }}>
        {this.state.alert}
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='header-content'>
                <div className='header-content-inner'>
                  {this.state.title && (<h1>{this.state.title}</h1>)}
                  <a href='#features' className='btn btn-outline btn-xl page-scroll'>Reserve Now!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {

}

export default Header
