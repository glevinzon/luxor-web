import React, { Component } from 'react'
import MainNav from './MainNav'
import Header from './Header'
import Footer from './Footer'

class HomeView extends Component {
  render () {
    return (
      <div className='page-top'>
        <MainNav />
        <Header />
        <Footer />
      </div>
    )
  }
}

HomeView.propTypes = {

}

export default HomeView
